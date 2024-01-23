import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { SignUpDto, AuthDto, UserIdDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { Model } from 'mongoose';

import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getSelf(id: string): Promise<any> {
    const user = await this.userModel.findById(id);
    return user;
  }

  async updateSelf(id: string, dto: any): Promise<any> {
    const user = await this.userModel.findByIdAndUpdate(id, dto, { new: true });
    return user;
  }

  async signup(dto: SignUpDto): Promise<any> {
    //Password actually matches
    if (dto.password !== dto.confirmedPassword)
      throw new BadRequestException('Hesla bohužel nesouhlasí');
    //generate the password hash
    const hashedPwd = await argon.hash(dto.password);
    const findIfMongoEmailIsTaken = await this.userModel.findOne({
      email: dto.email,
    });

    if (findIfMongoEmailIsTaken)
      throw new BadRequestException(
        'Uživatel je už s tímto emailem zaregistrovaný',
      );

    const user = await this.userModel.create({
      password: hashedPwd,
      email: dto.email,
      name: dto.name,
    });

    return user;
  }

  async signin(dto: AuthDto): Promise<any> {
    //find user by email
    const user = await this.userModel.findOne({
      email: dto.email,
    });

    if (!user) throw new ForbiddenException('This user does not exists');

    //compare passwords
    const passwordMatch: boolean = await argon.verify(
      user.password,
      dto.password,
    );
    if (!passwordMatch) throw new BadRequestException('Wrong password');
    const tokens = await this.signToken(user._id, user.email, user.authLevel);
    await this.userModel.findOneAndUpdate(
      { _id: user.id },
      { lastLoggedIn: new Date() },
      { new: true },
    );
    user.password = null;
    if (!user.isUserApproved)
      throw new BadRequestException(
        'Uživatel musí být ručně schválen provozovatelem aplikace pro zajištění maximálního bezpečí dat. Pokud chcete proces urychlit, napište email na huss@richtergedeon.cz',
      );

    return {
      user,
      tokens: tokens, //await this.signToken(user.id, user.email, user.authLevel),
    };
  }

  async logout(id: UserIdDto) {
    const user = await this.userModel.findByIdAndUpdate(
      id.id,
      {
        refresh_token: '',
      },
      { new: true },
    );
    if (!user)
      throw new BadRequestException(
        'User could not be logged off since it does not exist',
      );
    delete user.password;
    return user;
  }

  async signToken(
    userId: number,
    email: string,
    authLevel: string,
  ): Promise<Tokens> {
    const config = new ConfigService();
    const payload = {
      sub: userId,
      email,
      authLevel,
    };
    //Access token
    const token = await this.jwt.signAsync(payload, {
      expiresIn: config.get('JWT_EXPIRE'),
      secret: config.get('JWT_SECRET'),
    });
    //Refresh token
    const rToken = await this.jwt.signAsync(payload, {
      expiresIn: config.get('JWT_EXPIRE_REFRESH'),
      secret: config.get('JWT_REFRESH_SECRET'),
    });

    return { access_token: token, refresh_token: rToken };
  }

  //Update refresh token function

  async updateRefreshToken(
    userId: string,
    refresh_token: string,
  ): Promise<void> {
    const hash = await argon.hash(refresh_token);
    await this.userModel.findByIdAndUpdate(userId, {
      rtToken: hash,
    });
  }

  getExpirationFromToken(token: string): Date | null {
    try {
      const decodedToken = this.jwt.verify(token);
      if (typeof decodedToken === 'object' && decodedToken.exp) {
        return new Date(decodedToken.exp * 1000); // Convert to milliseconds
      }
    } catch (error) {
      // Token verification failed, or the token doesn't contain an expiration claim
      // You can handle this error based on your application's needs
    }
    return null; // Token is invalid or doesn't contain expiration
  }
}

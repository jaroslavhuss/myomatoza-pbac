/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable prettier/prettier */
import {
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseFilters,
  Controller,
  Get,
  Patch,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignUpDto, UserIdDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { AllExceptionsFilter } from 'util/catch-everything.filter';
import { JwtService } from '@nestjs/jwt';

@Controller('/auth')
@UseFilters(AllExceptionsFilter)
export class AuthController {
  // Tohle udělá novou instanci AuthService, aby to člověk nemusel psát jak úplný trotl
  constructor(private authService: AuthService, private jwt: JwtService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: SignUpDto): Promise<any> {
    const user = await this.authService.signup(dto);
    return { user };
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() dto: AuthDto) {
    const { user, tokens } = await this.authService.signin(dto);
    return { user, tokens };
  }

  //Only logged user can call this - we need ID of the current user!
  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@Body() dto: UserIdDto) {
    return this.authService.logout(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/self/:id')
  @HttpCode(HttpStatus.OK)
  getSelf(@Param('id') id: string) {
    return this.authService.getSelf(id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch('/self/:id')
  @HttpCode(HttpStatus.OK)
  updateSelf(@Param('id') id: string, @Body() dto: string) {
    return this.authService.updateSelf(id, dto);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('expiration')
  getExpiration(@Body() token: { token: string }) {
    //@ts-ignore
    const decodedToken: {
      exp: number;
    } = this.jwt.decode(token.token);

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const minutesLeft = Math.ceil(
      (decodedToken.exp - currentTimeInSeconds) / 60,
    );

    return minutesLeft;
    //@ts-ignore
  }
}

import {
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseFilters,
  Controller,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignUpDto, UserIdDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { AllExceptionsFilter } from 'util/catch-everything.filter';

@Controller('/auth')
@UseFilters(AllExceptionsFilter)
export class AuthController {
  // Tohle udělá novou instanci AuthService, aby to člověk nemusel psát jak úplný trotl
  constructor(private authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: SignUpDto): Promise<any> {
    const user = await this.authService.signup(dto);
    return { user };
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  //Only logged user can call this - we need ID of the current user!
  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@Body() dto: UserIdDto) {
    return this.authService.logout(dto);
  }
}

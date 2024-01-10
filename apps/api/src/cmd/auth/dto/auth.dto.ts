import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(8, { message: 'Minimum length is 8 with special characters' })
  @MaxLength(20, { message: 'Maximum length is 20' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/, {
    message:
      'Password is too weak - it has to contain at least one Capital Letter and one number.',
  })
  password: string;
}

export class SignUpDto {
  /**
   * EMAIL
   */
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  /**
   * PASSWORD
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Minimum length is 8 with special characters' })
  @MaxLength(20, { message: 'Maximum length is 20' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/, {
    message:
      'Password is too weak - it has to contain at least one Capital Letter and one number.',
  })
  password: string;

  /**
   * CONFIRMED PASSWORD
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Minimum length is 8 with special characters' })
  @MaxLength(20, { message: 'Maximum length is 20' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/, {
    message: 'Heslo je bohužel hodně slabé...',
  })
  confirmedPassword: string;

  @IsString({ message: 'Name must be a text!' })
  @IsNotEmpty({ message: 'Name is mandatory!' })
  name: string;
}

export class UserIdDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

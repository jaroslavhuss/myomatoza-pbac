import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQuestionnaireDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  maxrange: number;

  @IsString({ each: true })
  @IsNotEmpty()
  questions: string[];
}

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEndoDto {
  @IsString()
  @IsNotEmpty({
    message: 'Jméno pacienta je povinné',
  })
  pacientName: string;
  @IsString()
  @IsNotEmpty({
    message: 'Rodné číslo pacienta je povinné',
  })
  pacientSSN: string;
  @IsString()
  @IsNotEmpty()
  questionnaireDate: string;
  @IsString()
  @IsNotEmpty()
  supervisorDoctor: string;
  @IsNumber()
  @IsNotEmpty()
  __01Question: number;
  @IsNumber()
  @IsNotEmpty()
  __02Question: number;
  @IsNumber()
  @IsNotEmpty()
  __03Question: number;
  @IsNumber()
  @IsNotEmpty()
  __04Question: number;
  @IsNumber()
  @IsNotEmpty()
  __05Question: number;
  @IsNumber()
  @IsNotEmpty()
  __06Question: number;
  @IsNumber()
  @IsNotEmpty()
  __07Question: number;
  @IsNumber()
  @IsNotEmpty()
  __08Question: number;
  @IsNumber()
  @IsNotEmpty()
  __09Question: number;
  @IsNumber()
  @IsNotEmpty()
  __10Question: number;
  @IsNumber()
  @IsNotEmpty()
  __11Question: number;
  @IsNumber()
  @IsNotEmpty()
  __12Question: number;
  @IsNumber()
  @IsNotEmpty()
  __13Question: number;
  @IsNumber()
  @IsNotEmpty()
  __14Question: number;
  @IsNumber()
  @IsNotEmpty()
  __15Question: number;
  @IsNumber()
  @IsNotEmpty()
  sumValue: number;
}

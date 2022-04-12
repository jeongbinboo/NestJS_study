import { IsString, MinLength } from 'class-validator';

export class BoardDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  description: string;
}

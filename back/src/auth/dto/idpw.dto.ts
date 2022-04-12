import { IsString, MaxLength, MinLength } from 'class-validator';

export class IdPwDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  userId: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  userPassword: string;
}

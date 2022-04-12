import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IdPwDto } from './dto/idpw.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign_up')
  signUp(@Body(ValidationPipe) idPwDto: IdPwDto) {
    return this.authService.signUp(idPwDto);
  }

  @Post('sign_in')
  signIn(@Body(ValidationPipe) idPwDto: IdPwDto): Promise<string> {
    return this.authService.signIn(idPwDto);
  }

  @Post('oauth')
  getToken(@Body() code: { code: string }): Promise<string> {
    return this.authService.getToken(code.code);
  }
}

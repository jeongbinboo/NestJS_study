import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IdPwDto } from './dto/idpw.dto';
import { UserEntity } from './entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';
import { FtTokenEntity } from './entity/ftToken.entity';
import { networkInterfaces } from 'os';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private usersRepositoy: Repository<UserEntity>,
    @InjectRepository(FtTokenEntity)
    private ftTokenRepositoy: Repository<FtTokenEntity>,
  ) {}

  async signUp(signUpDto: IdPwDto) {
    const { userId, userPassword } = signUpDto;
    if (await this.usersRepositoy.findOne({ userId: userId })) {
      throw new ForbiddenException('signup exception');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPassword, salt);

    this.usersRepositoy.save({ userId: userId, userPassword: hashedPassword });
  }

  async signIn(signInDto: IdPwDto): Promise<string | any> {
    const { userId, userPassword } = signInDto;
    const target = await this.usersRepositoy.findOne({ userId: userId });
    if (target) {
      if (bcrypt.compare(userPassword, target.userPassword)) {
        const accessToken = this.jwtService.sign({ userId });
        return accessToken;
      } else {
        throw new NotFoundException('not found');
      }
    } else {
      return {
        code: '404',
        message: 'id not found',
      };
    }
  }
  async getToken(code: string): Promise<string> {
    const response = await axios.post('https://api.intra.42.fr/oauth/token', {
      grant_type: 'authorization_code',
      client_id: this.configService.get<string>('CLIENT_ID'),
      client_secret: this.configService.get<string>('CLIENT_SECRET'),
      code: code,
      redirect_uri: 'http://localhost:3000/loading',
    });
    const ftTokenObject = response.data; //db에 저장
    this.ftTokenRepositoy.save({
      access_token: ftTokenObject.access_token,
      refresh_token: ftTokenObject.refresh_token,
      created_at: new Date(),
      updated_at: new Date(),
    });
    const accessToken = this.jwtService.sign({ code });
    return accessToken;
  }
}

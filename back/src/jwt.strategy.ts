import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { UserEntity } from './auth/entity/user.entity';

//user로부터 access token을 받아서 유효성도 체크하고 payload에서 userId를 꺼내서 어느 유저인지 체크
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity) //payload에서 userId를 꺼내고 유저 정보를 가져오기 위한 repository
    private userRepositoy: Repository<UserEntity>,
  ) {
    super({
      secretOrKey: 'hello my name is Jeongbin Boo', //access token을 복호화(?) 하기 위해 필요한 secret key
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //access token을 헤더에서 가져오고 bearer 형식임
    });
  }
  async validate(payload) {
    const { userId } = payload;
    const user: UserEntity = await this.userRepositoy.findOne({ userId });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}

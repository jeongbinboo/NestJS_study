import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { FtTokenEntity } from './entity/ftToken.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'hello my name is Jeongbin Boo',
      signOptions: {
        expiresIn: 60 * 60,
      },
    }),
    HttpModule,
    TypeOrmModule.forFeature([UserEntity, FtTokenEntity]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [TypeOrmModule, PassportModule],
})
export class AuthModule {}

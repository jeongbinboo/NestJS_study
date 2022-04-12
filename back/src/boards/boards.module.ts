import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from 'src/auth/entity/user.entity';
import { JwtStrategy } from 'src/jwt.strategy';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardEntity } from './entity/boards.entity';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService, JwtStrategy],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([BoardEntity, UserEntity]),
  ],
})
export class BoardsModule {}

import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/entity/user.entity';
import { Repository } from 'typeorm';
import { BoardEntity } from './entity/boards.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async getAllBoards() {
    const boards: BoardEntity[] = await this.boardRepository.find();
    return boards;
  }

  async postBoard(user, board) {
    const { title, description } = board;
    this.boardRepository.save({
      title: title,
      description: description,
      user: user.id,
    });
  }

  async findById(userId) {
    const user = await this.userRepository.find({ userId: userId.userId });
    const userBoards: BoardEntity[] = await this.boardRepository.find({
      user: user[0],
    });
    return userBoards;
  }

  async findByTitle(title) {
    const boards = await this.boardRepository.find({ title: title.title });
    return boards;
  }
}

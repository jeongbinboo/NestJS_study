import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/entity/user.entity';
import { Like, Repository } from 'typeorm';
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

  async findByUserId(userId) {
    let results: BoardEntity[] = [];
    let i = 0;

    const users = await this.userRepository.find({
      userId: Like(`${userId}%`),
    });
    for (i = 0; i < users.length; i++) {
      const userBoards: BoardEntity[] = await this.boardRepository.find({
        user: users[i],
      });
      results = [...results, ...userBoards];
    }
    return results;
  }

  async findByTitle(title) {
    const boards = await this.boardRepository.find({
      title: Like(`${title}%`),
    });
    return boards;
  }

  async findByBoardId(boardId) {
    const board = await this.boardRepository.find({ id: boardId });
    return board;
  }

  async deleteBoard(boardId, user): Promise<boolean> {
    if (await this.validateUser(boardId, user)) {
      await this.boardRepository.delete({ id: boardId });
      return true;
    } else {
      return false;
    }
  }
  async validateUser(boardId, user): Promise<boolean> {
    const board: BoardEntity = await this.boardRepository.findOne({
      id: boardId,
    });
    if (board.user.id === user.id) {
      return true;
    } else {
      return false;
    }
  }
  async modifyBoard(boardId, boardContents) {
    const board = await this.boardRepository.findOne({ id: boardId });
    board.title = boardContents.title;
    board.description = boardContents.description;
    await this.boardRepository.save(board);
  }
}

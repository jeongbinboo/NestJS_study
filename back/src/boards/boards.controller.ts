import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BoardsService } from './boards.service';
import { BoardDto } from './dto/boardDto';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private readonly boardService: BoardsService) {}
  @Get('/') //Get all boards
  getAllBoards() {
    return this.boardService.getAllBoards();
  }

  @Post('/add') //Post board
  postBoard(@Req() req, @Body(ValidationPipe) board: BoardDto) {
    return this.boardService.postBoard(req.user, board);
  }

  @Get('/findByUserId/:userId') //Get specific user's boards
  findByUserId(@Param('userId') userId: string) {
    return this.boardService.findByUserId(userId);
  }

  @Get('/findByTitle/:title')
  findByTitle(@Param('title') title: string) {
    return this.boardService.findByTitle(title);
  }

  @Get('/findByBoardId/:id')
  findByBoardId(@Param('id') id: string) {
    return this.boardService.findByBoardId(id);
  }
}

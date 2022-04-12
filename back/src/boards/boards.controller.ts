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

  @Post('/findById') //Get specific user's boards
  findById(@Body() userId) {
    return this.boardService.findById(userId);
  }

  @Post('/findByTitle')
  findByTitle(@Body() title) {
    return this.boardService.findByTitle(title);
  }
}

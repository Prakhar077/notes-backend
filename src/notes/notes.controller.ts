import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { RequestWithUser } from '../types/RequestWithUser'; // adjust path if needed

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  getNotes(@Request() req: RequestWithUser) {
    return this.notesService.findAll(req.user.userId);
  }

  @Post()
  createNote(@Request() req: RequestWithUser, @Body() body: CreateNoteDto) {
    return this.notesService.create(req.user.userId, body.title, body.content);
  }

  @Put(':id')
  updateNote(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
    @Body() body: UpdateNoteDto,
  ) {
    return this.notesService.update(req.user.userId, +id, body.title, body.content);
  }

  @Delete(':id')
  deleteNote(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.notesService.remove(req.user.userId, +id);
  }
}

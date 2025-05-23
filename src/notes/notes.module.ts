import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), UsersModule],
  providers: [NotesService],
  controllers: [NotesController],
})
export class NotesModule {}
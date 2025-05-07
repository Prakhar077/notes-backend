import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private repo: Repository<Note>,
    private usersService: UsersService,
  ) {}

  async findAll(userId: number) {
    return this.repo.find({ where: { user: { id: userId } } });
  }

  async create(userId: number, title: string, content: string): Promise<Note> {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const note = this.repo.create({
      title,
      content,
      user,
    });

    return this.repo.save(note);
  }

  async update(userId: number, id: number, title: string, content: string) {
    const note = await this.repo.findOne({ where: { id }, relations: ['user'] });
    if (!note || note.user.id !== userId) throw new NotFoundException();
    note.title = title;
    note.content = content;
    return this.repo.save(note);
  }

  async remove(userId: number, id: number) {
    const note = await this.repo.findOne({ where: { id }, relations: ['user'] });
    if (!note || note.user.id !== userId) throw new NotFoundException();
    return this.repo.remove(note);
  }
}

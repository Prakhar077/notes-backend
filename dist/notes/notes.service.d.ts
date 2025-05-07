import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { UsersService } from '../users/users.service';
export declare class NotesService {
    private repo;
    private usersService;
    constructor(repo: Repository<Note>, usersService: UsersService);
    findAll(userId: number): Promise<Note[]>;
    create(userId: number, title: string, content: string): Promise<Note>;
    update(userId: number, id: number, title: string, content: string): Promise<Note>;
    remove(userId: number, id: number): Promise<Note>;
}

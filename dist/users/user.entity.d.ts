import { Note } from '../notes/note.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    notes: Note[];
}

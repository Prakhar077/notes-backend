import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { RequestWithUser } from '../types/RequestWithUser';
export declare class NotesController {
    private readonly notesService;
    constructor(notesService: NotesService);
    getNotes(req: RequestWithUser): Promise<import("./note.entity").Note[]>;
    createNote(req: RequestWithUser, body: CreateNoteDto): Promise<import("./note.entity").Note>;
    updateNote(req: RequestWithUser, id: string, body: UpdateNoteDto): Promise<import("./note.entity").Note>;
    deleteNote(req: RequestWithUser, id: string): Promise<import("./note.entity").Note>;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const note_entity_1 = require("./note.entity");
const users_service_1 = require("../users/users.service");
let NotesService = class NotesService {
    constructor(repo, usersService) {
        this.repo = repo;
        this.usersService = usersService;
    }
    async findAll(userId) {
        return this.repo.find({ where: { user: { id: userId } } });
    }
    async create(userId, title, content) {
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
    async update(userId, id, title, content) {
        const note = await this.repo.findOne({ where: { id }, relations: ['user'] });
        if (!note || note.user.id !== userId)
            throw new common_1.NotFoundException();
        note.title = title;
        note.content = content;
        return this.repo.save(note);
    }
    async remove(userId, id) {
        const note = await this.repo.findOne({ where: { id }, relations: ['user'] });
        if (!note || note.user.id !== userId)
            throw new common_1.NotFoundException();
        return this.repo.remove(note);
    }
};
exports.NotesService = NotesService;
exports.NotesService = NotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(note_entity_1.Note)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], NotesService);
//# sourceMappingURL=notes.service.js.map
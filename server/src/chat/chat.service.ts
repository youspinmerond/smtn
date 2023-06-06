import { Injectable } from '@nestjs/common';
import { CreateChat } from 'dto/chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
    constructor(private prisma: PrismaService) {}
    get(id: number) {
        return this.prisma.getChat(id);
    }
    getMessages(id: number) {
        return this.prisma.getMessages(id);
    }

    create(body: CreateChat) {
        return this.prisma.createChat(body);
    }
}

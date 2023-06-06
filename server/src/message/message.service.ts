import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { createMessage } from 'dto/create_message.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessageService {
    constructor(private prisma: PrismaService) {}
    create(msg: createMessage) {
        return this.prisma.createMessage(msg);
    }
    delete(id: number) {
        return this.prisma.deleteMessage(id);
    }
}

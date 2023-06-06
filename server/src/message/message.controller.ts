import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from '@prisma/client';
import { createMessage } from 'dto/create_message.dto';

@Controller('message')
export class MessageController {
    constructor(private message: MessageService) {}
    @Get()
    getMessage() {

    }
    @Post()
    createMessage(@Body() body: createMessage) {
        
        return this.message.create(body);
    }
}

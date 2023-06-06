import { Body, Controller, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Query, Res } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChat } from 'dto/chat.dto';
import { Response } from 'express';

@Controller('chat')
export class ChatController {
    constructor(private chat: ChatService) {}

    @Get(':id')
    async getChat(
        @Param('id', ParseIntPipe) id,
        @Query('messages') messages
    ) {
        if(!messages || messages === false) {
            return this.chat.get(id);
        } else {
            return this.chat.getMessages(id);
        }
    }

    @Post()
    async createChat(@Body() body: CreateChat, @Res() response: Response) {
        if("authorId" in body.firstMessage !== true|| "content" in body.firstMessage !== true) {
            return response.status(403)
                .json({msg: "Specify 'authorId' and 'content' in 'firstMessage' object."})
        }
        const res = await this.chat.create(body);
        if("msg" in res) {
            return response
                .status(403)
                .json(res);
        }
        return response.json(res);
    }
}

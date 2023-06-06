import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { MessageController } from './message/message.controller';
import { MessageService } from './message/message.service';
import { ChatController } from './chat/chat.controller';
import { ChatService } from './chat/chat.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, MessageController, ChatController],
  providers: [AppService, PrismaService, UserService, MessageService, ChatService],
})
export class AppModule {}

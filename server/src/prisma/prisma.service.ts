import { Global, Injectable } from '@nestjs/common';
import { ChatType, PrismaClient } from '@prisma/client';
import User from 'dto/user.dto';
import { env } from 'process';
import { createMessage } from 'dto/create_message.dto';
import { Chat, CreateChat } from 'dto/chat.dto';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

@Global()
@Injectable()
export class PrismaService {
    public async createUser({name, password}: User) {
        password = await bcrypt.hashSync(password, env.SALT, (err, res) => res);
        
        const res = await prisma.user.create({
            data: {
                name,
                password
            }
        });
        delete res.password;
        const result = {...res} as any;
        result.token = jwt.sign(res, env.SALT);
        return result;
    }

    public async getUser(id: number) {
        const res = await prisma.user.findUnique({
            where: {
                id
            }
        });
        delete res.password;
        return res;
    }

    public async createMessage({authorId, chatId, content}: createMessage) {
        const res = await prisma.message.create({
            data: {
                authorId,
                chatId,
                content 
            }
        });
        return res;
    }
    public async getChat(id: number) {
        try {
        const res: Chat = await prisma.chat.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                type: true,
                password: true,
            },
        });
        const lastMessage = await prisma.message.findMany({
            where: {
                chatId: id
            },
            orderBy: {
                id: 'desc'
            },
            take: 1
        });
        res.messages = lastMessage;

        console.log(res);
        
        return res;
        } catch (e) {
            return null
        }
    }

    public async getMessages(id: number) {
        return prisma.message.findMany({
            where: {
                chatId: id
            },
            orderBy: {
                id: "asc"
            },
            take: 100
        });
    }

    public async createChat({type, name, firstMessage, password}: CreateChat) {
        try {
            if((password === null || password === undefined) && type === "PRIVATE")
                throw {msg: "need password"};

            const data: {type: ChatType, name: string, password?: string} = {
                type,
                name
            }
            data.password = password;

            const res = await prisma.chat.create({
                data
            });
            const resMessage = await prisma.message.create({
                data: {
                    authorId: firstMessage.authorId,
                    content: firstMessage.content,
                    chatId: res.id
                }
            });
            return [res, resMessage];
        } catch(e) {
            return e;
        }
    }

    public async deleteMessage(id: number) {
        try {
            const res = await prisma.message.delete({
                where: {
                    id
                }
            });
            return res;
        } catch (e) {
            return null;
        }
    }
    
    public async login(name: string) {
        return prisma.user.findUnique({
            where: {
                name
            }
        });
    }
}

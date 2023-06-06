import { ChatType, Message } from "@prisma/client"
import { IsArray, IsNotEmpty, IsObject, MinLength } from "class-validator"

export class CreateChat {
    @MinLength(2)
    name: string
    @IsNotEmpty()
    type: ChatType

    password: string | null

    @IsNotEmpty()
    @IsObject()
    firstMessage: Message
}

export class Chat {
    @MinLength(2)
    name: string
    @IsNotEmpty()
    type: ChatType

    password?: string | null
    
    @IsNotEmpty()
    @IsArray()
    messages?: Array<Message>
}
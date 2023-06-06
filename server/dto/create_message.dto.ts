import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createMessage {
    @IsNumber()
    @IsNotEmpty()
    authorId: number;

    @IsNumber()
    @IsNotEmpty()
    chatId: number

    @IsString()
    content: string;
}
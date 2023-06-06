import { IsNotEmpty, IsString } from "class-validator";

export class TokenCheck {
    @IsString()
    @IsNotEmpty()
    token: string;
}
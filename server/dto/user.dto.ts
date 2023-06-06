import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export default class User {
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(16)
    name: string;
    
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
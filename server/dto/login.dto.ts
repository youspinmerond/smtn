import { MinLength } from "class-validator";

export class Login {
    
    @MinLength(3)
    name: string;

    @MinLength(6)
    password: string;
}
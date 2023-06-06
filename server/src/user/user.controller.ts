import { Body, Controller, Get, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import User from 'dto/user.dto';
import { UserService } from './user.service';
import { Login } from 'dto/login.dto';
import { Response } from 'express';
import { TokenCheck } from 'dto/tokenCheck.dto';

@Controller('user')
export class UserController {
    constructor(private users: UserService) {}
    @Get('/:id')
    getUser(@Param('id', ParseIntPipe) id: number) {
        return this.users.get(id);
    }
    @Post()
    createUser(@Body() body: User): any {
        return this.users.create(body);
    }

    @Post('login')
    async login(@Body() body: Login, @Res() res: Response) {
        const result = await this.users.login(body);
        if(result !== null) {
            res.status(200)
            .setHeader('Content-Type', 'application/json')
            .json(result);
        } else {
            res.status(403)
            .json({msg: result});
        }
    }
    @Post('check')
    async check(@Body() body, @Res() response: Response) {
        const res = await this.users.check(body.token);
        if(res === undefined) {
            response.status(403)
            .json({err:"Empty answer."});
        }
        if("err" in res) {
            response.status(403)
            .json(res);
            return;
        }
        response.status(200)
        .json(res);
    }
}
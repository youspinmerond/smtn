import { Injectable } from '@nestjs/common';
import { Login } from 'dto/login.dto';
import User from 'dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { env } from 'process';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}
    public async get(id: number) {
        return this.prisma.getUser(id);
    }
    public async create(body: User) {
        return this.prisma.createUser(body);
    }

    public async login({name, password}: Login) {
        const res = await this.prisma.login(name);
        password = bcrypt.hashSync(password, env.SALT, (err, res) => res);
        
        if(password === res.password) {
            delete res.password;
            return {token: jwt.sign(res, env.SALT), ...res};
        } else {
            return null;
        }
    }

    public async check(token: string) {
        let res;
        try {
            res = jwt.verify(token, env.SALT);
        } catch (e) {
            res = {err: "Failed signature"};
        }
        return res;
    }
}

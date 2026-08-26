import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable() 
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    findByPhone(phone: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { phone }});
    }

    create(phone: string, name?:string): Promise<User> {
        return this.prisma.user.create({
            data: { phone, name },
        });
    }
}
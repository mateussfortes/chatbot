import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    findByPhone(phone: string) {
        return this.userRepository.findByPhone(phone);
    }

    create(phone: string, name?: string) {
        return this.userRepository.create(phone, name);
    }
}
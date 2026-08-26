import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { WebhookDto } from './dto/webhook.dto';

@Injectable() 
export class WebhookService {
    constructor(private readonly userService: UserService) {}

    async handle(payload: WebhookDto) {
        let user = await this.userService.findByPhone(payload.from);

        if(!user) {
            user = await this.userService.create(payload.from);
        }

        console.log("User: " + user);
        return { received: true, from: user.phone, message: payload.message };
    }
}
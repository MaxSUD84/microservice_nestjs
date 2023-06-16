import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateUser(email: string) {
    return email === 'test@mail.ru';
    // на реальном проекте реализуется очередь с запросом проверки наличия такого пользователя в базе
  }
}

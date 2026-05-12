// auth.service.ts
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UsersService) { }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const userExists = await this.userService.findbyEmail(createUserDto.email);
    if (userExists) {
      throw new ConflictException('Email ya registrado');
    }
    try {
      const newUser = await this.userService.create(createUserDto);
      return await this.login(newUser);
    } catch (error) {
      throw new InternalServerErrorException('Email inválido');
    }
  }
}
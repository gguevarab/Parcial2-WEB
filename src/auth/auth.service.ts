import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UsersService) { }

  async login(user: any) {
    const userExists = await this.userService.findbyEmail(user.email);
    if (!userExists || userExists.password !== user.password) {
      throw new HttpException('Credenciales incorrectas', HttpStatus.FORBIDDEN);
    }
    if (!userExists.is_active) {
      throw new HttpException('Usuario desactivado', HttpStatus.LOCKED);
    }
    const payload = { username: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
    };
  }

  async register(createUserDto: CreateUserDto) {
    const userExists = await this.userService.findbyEmail(createUserDto.email);
    if (userExists) {
      throw new HttpException('Email ya registrado', HttpStatus.CONFLICT);
    }
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      createUserDto.password = hashedPassword;
      const newUser = await this.userService.create(createUserDto);
      return {
        statusCode: 201,
        message: 'Usuario registrado con exito',
        userId: newUser.id,
        data: newUser
      }
    } catch (error) {
      throw new HttpException('Email inválido', HttpStatus.BAD_REQUEST);
    }
  }
}
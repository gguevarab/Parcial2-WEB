import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UsersService) { }

  async login(user: LoginDto): Promise<{ access_token: string }> {
    const userExists = await this.userService.findbyEmail(user.email);
    if (!userExists || !bcrypt.compareSync(user.password, userExists.password)) {
      throw new HttpException('Credenciales incorrectas', HttpStatus.UNAUTHORIZED);
    }
    if (!userExists.is_active) {
      throw new HttpException('Usuario desactivado', HttpStatus.LOCKED);
    }
    const payload = { username: userExists.email, sub: userExists.id, roles: userExists.roles.map(role => role.role_name) };
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

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    const newUser = await this.userService.create(createUserDto);

    return {
      message: 'Usuario registrado con éxito',
      userId: newUser.id,
    };
  }
}
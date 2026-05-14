import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll() {
    try {
      const users = await this.userRepository.find({ relations: ['roles'] });
      return users.map(user => {
        delete (user as any).password;
        return user;
      });
    } catch (error) {
      throw new HttpException('Error al listar usuarios', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['roles'] });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    delete (user as any).password;
    return user;
  }

  async findbyEmail(email: string) {
    return await this.userRepository.findOne({ where: { email }, relations: ['roles'] });
  }

  async addRoles(userId: string, roleNames: string[]) {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['roles'] });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    const rolesToAdd: Role[] = [];

    for (const roleName of roleNames) {
      const roleExists = await this.roleRepository.findOne({ where: { role_name: roleName } });

      if (!roleExists) {
        throw new HttpException('roles inválidos', HttpStatus.BAD_REQUEST);
      }

      rolesToAdd.push(roleExists);
    }

    user.roles = rolesToAdd;
    await this.userRepository.save(user);

    return { message: 'Roles asignados' };
  }
}

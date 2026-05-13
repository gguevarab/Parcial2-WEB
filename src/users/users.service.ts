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
    const users = await this.userRepository.find()
    if (!users) {
      throw new HttpException('Error al listar usuarios', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findbyEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async addRoles(userId: string, roles: Role[]) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    let areRolesValid = true;
    for (const role of roles) {
      const roleExists = await this.roleRepository.findOne({ where: { id: role.id } });
      if (!roleExists) {
        areRolesValid = false;
        break;
      }
    }
    if (!areRolesValid) {
      throw new HttpException('Rol no encontrado', HttpStatus.NOT_FOUND);
    }
    user.roles = user.roles.concat(roles);
    return await this.userRepository.save(user);
  }
}

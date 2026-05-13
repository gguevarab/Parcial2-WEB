import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) { }

  async create(createRoleDto: CreateRoleDto) {
    const roleExists = await this.roleRepository.findOne({ where: { role_name: createRoleDto.role_name } });
    if (roleExists) {
      throw new HttpException(`${createRoleDto.role_name} ya existe`, HttpStatus.CONFLICT);
    }

    const role = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(role);
  }

  async findAll() {
    try {
      return await this.roleRepository.find();
    } catch (error) {
      throw new HttpException("Error al obtener roles", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

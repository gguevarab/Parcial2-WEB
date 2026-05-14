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
      throw new HttpException('role_name ya existe', HttpStatus.CONFLICT);
    }

    const role = this.roleRepository.create(createRoleDto);
    const savedRole = await this.roleRepository.save(role);
    return { message: "Rol creado con éxito", roleId: savedRole.id };
  }

  async findAll() {
    try {
      return await this.roleRepository.find();
    } catch (error) {
      throw new HttpException("Error al obtener roles", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

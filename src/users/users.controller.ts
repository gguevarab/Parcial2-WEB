import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/roles/entities/role.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Request() req) {
    return this.usersService.findOne(req.user.sub);
  }

  @Patch(':id/roles')
  @UseGuards(JwtAuthGuard)
  addRoles(@Param('id') id: string, @Body() roles: Role[]) {
    return this.usersService.addRoles(id, roles);
  }
}


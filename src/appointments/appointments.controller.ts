import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Roles } from 'src/auth/decorators/roles/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Req } from '@nestjs/common';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) { }

  // Create an appointment restricted to users
  @Post('client/me')
  @Roles('user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Req() req, @Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(req.user.id, createAppointmentDto);
  }

  // Get All appointments restricted to admin
  @Get('admin/all')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.appointmentsService.findAdminAll();
  }

  // Get own appointment for users
  @Get('client/me')
  @Roles('user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOwnAppointments(@Req() req) {
    return this.appointmentsService.findClientAppointments(req.user.id);
  }

  // Get doctor own appointments and patients appointments
  @Get('doctor/me')
  @Roles('doctor')
  @UseGuards(JwtAuthGuard, RolesGuard)
  findDoctorAppointments(@Req() req) {
    return this.appointmentsService.findDoctorAppointments(req.user.id);
  }

  // Update an appointment restricted to doctors
  @Patch('doctor/me/:appointmentId')
  @Roles('doctor')
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(@Param('appointmentId') appointmentId: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.updateDoctorAppointment(appointmentId, updateAppointmentDto);
  }

  // Cancel an appointment restricted to users
  @Delete('client/me/:appointmentId')
  @Roles('user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param('appointmentId') appointmentId: string) {
    return this.appointmentsService.removeClientAppointment(appointmentId);
  }
}

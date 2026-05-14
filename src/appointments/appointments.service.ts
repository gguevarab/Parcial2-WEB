import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) { }

  async create(clientId: string, createAppointmentDto: CreateAppointmentDto) {
    const appointment = this.appointmentRepository.create({
      ...createAppointmentDto,
      client_id: clientId,
    });
    return await this.appointmentRepository.save(appointment);
  }

  async findAdminAll() {
    const appointments = await this.appointmentRepository.find({ relations: ['user', 'doctor'] });
    if (!appointments) {
      throw new HttpException('Appointments not found', HttpStatus.NOT_FOUND);
    }
    //error code if not correct role
    return appointments;
  }

  async findClientAppointments(clientId: string) {
    // The client can only see his own appointments
    const appointments = await this.appointmentRepository.find({ where: { client_id: clientId }, relations: ['user', 'doctor'] });
    if (!appointments) {
      throw new HttpException('Appointments not found', HttpStatus.NOT_FOUND);
    }
    if (!clientId) {
      throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
    }
    return appointments;
  }

  async findDoctorAppointments(doctorId: string) {
    // The doctor can only see his own appointments and the clients 
    const appointments = await this.appointmentRepository.find({ where: { doctor_id: doctorId }, relations: ['user', 'doctor'] });
    if (!appointments) {
      throw new HttpException('Appointments not found', HttpStatus.NOT_FOUND);
    }
    if (!doctorId) {
      throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
    }
    return appointments;
  }

  async updateDoctorAppointment(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    // The doctor can only make two changes: 
    // 1. change status from pending to done
    // 2. change status from pending to cancelled
    const appointment = await this.appointmentRepository.findOne({ where: { id } });
    if (!appointment) {
      throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);
    }
    if (appointment.status !== 'pending') {
      throw new HttpException('Appointment is not pending', HttpStatus.BAD_REQUEST);
    }

    return await this.appointmentRepository.update(id, updateAppointmentDto);
  }

  async removeClientAppointment(id: string) {
    const appointment = await this.appointmentRepository.findOne({ where: { id } });
    if (!appointment) {
      throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);
    }

    return await this.appointmentRepository.delete(id);
  }
}

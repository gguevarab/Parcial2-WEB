import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create-appointment.dto';
import { IsEnum, IsString } from 'class-validator';

export class UpdateAppointmentDto {
    @IsString()
    @IsEnum(['pending', 'cancelled', 'done'])
    status: string;
}

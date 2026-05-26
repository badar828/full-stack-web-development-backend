import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios'; // Handles forwarding to Express
import { firstValueFrom } from 'rxjs';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly httpService: HttpService, // Inject HTTP tools
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    // 1. Save to PostgreSQL
    const newAppointment = this.appointmentRepository.create(createAppointmentDto);
    const savedAppointment = await this.appointmentRepository.save(newAppointment);

    // 2. Mirror/Forward data to Express Server (Port 5000) for MongoDB storage
    try {
      const expressPayload = {
        doctor: savedAppointment.doctorName,
        date: savedAppointment.date,
        problem: savedAppointment.patientName, // Maps the saved column string back over
      };

      // Fires a background POST request directly to your Express endpoint
      await firstValueFrom(
        this.httpService.post('http://localhost:5000/api/appointments', expressPayload)
      );
      console.log('Successfully mirrored appointment data to MongoDB!');
    } catch (error: any) { // 👈 Add ': any' right here to fix the strict type check!
      console.error('PostgreSQL saved, but failed to sync data to MongoDB:', error.message);
    }

    // 3. Return the database object to React
    return savedAppointment;
  }

  async findAll() {
    return await this.appointmentRepository.find();
  }

  async findOne(id: number) {
    return await this.appointmentRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    await this.appointmentRepository.update(id, updateAppointmentDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const appointment = await this.findOne(id);
    await this.appointmentRepository.delete(id);
    return appointment;
  }
}
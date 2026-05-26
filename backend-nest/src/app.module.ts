import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsModule } from './doctors/doctors.module';
import { Doctor } from './doctors/entities/doctor.entity';
import { AppointmentsModule } from './appointments/appointments.module';
import { Appointment } from './appointments/entities/appointment.entity'; // Added this import

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',            
      port: 5432,                    
      username: 'postgres',          
      password: '12345', 
      database: 'postgres',         
      entities: [Doctor, Appointment], // Added Appointment here
      synchronize: true,             
    }),
    DoctorsModule,
    AppointmentsModule,
  ],
})
export class AppModule {}
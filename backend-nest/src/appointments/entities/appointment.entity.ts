import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id!: number; // Added ! here

  @Column({ nullable: true })
  patientName!: string; // Added ! here

  @Column({ nullable: true })
  doctorName!: string; // Added ! here

  @Column({ nullable: true })
  date!: string; // Added ! here

  @Column({ nullable: true })
  time!: string; // Added ! here
}
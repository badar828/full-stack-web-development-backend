import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto'; // Double-check this path matches your folder structure
import { UpdateDoctorDto } from './dto/update-doctor.dto'; // Double-check this path matches your folder structure

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  // 1. CREATE
  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const newDoctor = this.doctorRepository.create(createDoctorDto);
    return await this.doctorRepository.save(newDoctor);
  }

  // 2. FIND ALL
  async findAll(): Promise<Doctor[]> {
    return await this.doctorRepository.find();
  }

  // 3. FIND ONE BY ID
  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({ where: { id } });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    return doctor;
  }

  // 4. UPDATE
  async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    const doctor = await this.findOne(id); // Reuses findOne to check if it exists
    Object.assign(doctor, updateDoctorDto);
    return await this.doctorRepository.save(doctor);
  }

  // 5. REMOVE
  async remove(id: number): Promise<{ message: string }> {
    const doctor = await this.findOne(id); // Checks if it exists first
    await this.doctorRepository.remove(doctor);
    return { message: `Doctor with ID ${id} successfully removed` };
  }
}
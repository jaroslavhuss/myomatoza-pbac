import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from 'src/schemas/patient.schema';
@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
  ) {}
  async create(createPatientDto: CreatePatientDto) {
    const createdPatient = await this.patientModel.create(createPatientDto);
    return createdPatient;
  }

  async findAll(_id: string) {
    const data = await this.patientModel.find({
      supervisingDoctor: _id.toString(),
    });
    return data;
  }

  async findOne(id: number) {
    const data = await this.patientModel.findById(id);
    return data;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const updatedData = await this.patientModel.findByIdAndUpdate(
      id,
      updatePatientDto,
    );
    return updatedData;
  }

  async remove(id: number) {
    const data = await this.patientModel.deleteOne({ _id: id });
    return data;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateMyomDto } from './dto/create-myom.dto';
import { CreateEndoDto } from './dto/create-endo.dto';
import { UpdateMyomDto } from './dto/update-myom.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  MyomsQuestionnaire,
  MyomsQuestionnaireDocument,
} from '../../schemas/myomQuestionnaire.schema';
import {
  EndoQuestionnaire,
  EndoQuestionnaireDocument,
} from '../../schemas/endomQuestionnaire.schema';
import { IUser } from 'src/interfaces_enums';

@Injectable()
export class MyomsService {
  constructor(
    @InjectModel(MyomsQuestionnaire.name)
    private myomsModel: Model<MyomsQuestionnaireDocument>,
    @InjectModel(EndoQuestionnaire.name)
    private endoModel: Model<EndoQuestionnaireDocument>,
  ) {}

  async create(createMyomDto: CreateMyomDto) {
    const rodcisloPattern = /^\d{6}\d{4}$/;
    const rodcislo = createMyomDto.pacientSSN;

    if (!rodcisloPattern.test(rodcislo)) {
      throw new Error(
        'Rodné číslo musí být ve formátu 1234561234 - bez lomítka',
      );
    }

    const createdDocument = await this.myomsModel.create(createMyomDto);
    return createdDocument;
  }

  async findAll(user: IUser) {
    const data = await this.myomsModel.find({
      supervisorDoctor: user._id.toString(),
    });
    return data;
  }

  async update(id: string, updateMyomDto: UpdateMyomDto, user: IUser) {
    //Only supervisorDoctor if owns the document can update it
    return this.myomsModel.findOneAndUpdate(
      {
        _id: id,
        supervisorDoctor: user._id.toString(),
      },
      updateMyomDto,
      { new: true },
    );
  }

  async remove(id: string, user: IUser) {
    //Only supervisorDoctor if owns the document can delete it
    return this.myomsModel.findOneAndDelete({
      _id: id,
      supervisorDoctor: user._id.toString(),
    });
  }
  //Endometriosis CRUD the exact same way like Myoms

  async createEndo(createMyomDto: CreateEndoDto) {
    const rodcisloPattern = /^\d{6}\d{4}$/;
    const rodcislo = createMyomDto.pacientSSN;

    if (!rodcisloPattern.test(rodcislo)) {
      throw new Error(
        'Rodné číslo musí být ve formátu 1234561234 - bez lomítka',
      );
    }

    const createdDocument = await this.endoModel.create(createMyomDto);
    return createdDocument;
  }

  async findAllEndo(user: IUser) {
    const data = await this.endoModel.find({
      supervisorDoctor: user._id.toString(),
    });
    return data;
  }

  async updateEndo(id: string, updateMyomDto: UpdateMyomDto, user: IUser) {
    //Only supervisorDoctor if owns the document can update it
    return this.endoModel.findOneAndUpdate(
      {
        _id: id,
        supervisorDoctor: user._id.toString(),
      },
      updateMyomDto,
      { new: true },
    );
  }

  async removeEndo(id: string, user: IUser) {
    //Only supervisorDoctor if owns the document can delete it
    return this.endoModel.findOneAndDelete({
      _id: id,
      supervisorDoctor: user._id.toString(),
    });
  }
}

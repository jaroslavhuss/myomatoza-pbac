import { Injectable } from '@nestjs/common';
import { CreateMyomDto } from './dto/create-myom.dto';
import { UpdateMyomDto } from './dto/update-myom.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  MyomsQuestionnaire,
  MyomsQuestionnaireDocument,
} from '../../schemas/myomQuestionnaire.schema';
import { IUser } from 'src/interfaces_enums';

@Injectable()
export class MyomsService {
  constructor(
    @InjectModel(MyomsQuestionnaire.name)
    private myomsModel: Model<MyomsQuestionnaireDocument>,
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

  update(id: string, updateMyomDto: UpdateMyomDto, user: IUser) {
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

  remove(id: string, user: IUser) {
    //Only supervisorDoctor if owns the document can delete it
    return this.myomsModel.findOneAndDelete({
      _id: id,
      supervisorDoctor: user._id.toString(),
    });
  }
}

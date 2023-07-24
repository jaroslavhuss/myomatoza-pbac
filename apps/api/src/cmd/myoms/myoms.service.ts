import { Injectable } from '@nestjs/common';
import { CreateMyomDto } from './dto/create-myom.dto';
import { UpdateMyomDto } from './dto/update-myom.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  MyomsQuestionnaire,
  MyomsQuestionnaireDocument,
} from '../../schemas/myomQuestionnaire.schema';

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

  findAll() {
    return `This action returns all myoms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} myom`;
  }

  update(id: number, updateMyomDto: UpdateMyomDto) {
    return `This action updates a #${id} myom`;
  }

  remove(id: number) {
    return `This action removes a #${id} myom`;
  }
}

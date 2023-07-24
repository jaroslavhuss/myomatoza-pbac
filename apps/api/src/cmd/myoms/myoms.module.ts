import { Module } from '@nestjs/common';
import { MyomsService } from './myoms.service';
import { MyomsController } from './myoms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MyomsQuestionnaireSchema,
  MyomsQuestionnaire,
} from '../../schemas/myomQuestionnaire.schema';

@Module({
  controllers: [MyomsController],
  providers: [MyomsService],
  imports: [
    MongooseModule.forFeature([
      { name: MyomsQuestionnaire.name, schema: MyomsQuestionnaireSchema },
    ]),
  ],
})
export class MyomsModule {}

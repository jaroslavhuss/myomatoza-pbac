import { Module } from '@nestjs/common';
import { MyomsService } from './myoms.service';
import { MyomsController } from './myoms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MyomsQuestionnaireSchema,
  MyomsQuestionnaire,
} from '../../schemas/myomQuestionnaire.schema';
import {
  EndoQuestionnaireSchema,
  EndoQuestionnaire,
} from '../../schemas/endomQuestionnaire.schema';
@Module({
  controllers: [MyomsController],
  providers: [MyomsService],
  imports: [
    MongooseModule.forFeature([
      { name: MyomsQuestionnaire.name, schema: MyomsQuestionnaireSchema },
      { name: EndoQuestionnaire.name, schema: EndoQuestionnaireSchema },
    ]),
  ],
})
export class MyomsModule {}

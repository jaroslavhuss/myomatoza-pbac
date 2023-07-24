import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export type MyomsQuestionnaireDocument = MyomsQuestionnaire & Document;

@Schema()
export class MyomsQuestionnaire {
  /**
   * MANDATORY PROPS
   */
  @Prop()
  pacientName: string;
  @Prop()
  pacientSSN: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  supervisorDoctor: Types.ObjectId;

  @Prop()
  questionnaireDate: string;
  @Prop()
  __01Question: number;
  @Prop()
  __02Question: number;
  @Prop()
  __03Question: number;
  @Prop()
  __04Question: number;
  @Prop()
  __05Question: number;
  @Prop()
  __06Question: number;
  @Prop()
  __07Question: number;
  @Prop()
  __08Question: number;
  @Prop()
  __09Question: number;
  @Prop()
  __10Question: number;
  @Prop()
  sumValue: number;
}

export const MyomsQuestionnaireSchema =
  SchemaFactory.createForClass(MyomsQuestionnaire);

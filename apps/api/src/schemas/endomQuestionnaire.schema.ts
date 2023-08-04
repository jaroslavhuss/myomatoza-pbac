import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export type EndoQuestionnaireDocument = EndoQuestionnaire & Document;

@Schema()
export class EndoQuestionnaire {
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
  __11Question: number;
  @Prop()
  __12Question: number;
  @Prop()
  __13Question: number;
  @Prop()
  __14Question: number;
  @Prop()
  __15Question: number;
  @Prop()
  sumValue: number;
}

export const EndoQuestionnaireSchema =
  SchemaFactory.createForClass(EndoQuestionnaire);

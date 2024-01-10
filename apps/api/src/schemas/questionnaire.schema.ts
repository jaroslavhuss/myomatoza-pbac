import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionnaireDocument = Questionnaire & Document;

@Schema()
export class Questionnaire {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  maxrange: number;

  @Prop()
  questions: string[];
}

export const QuestionnaireSchema = SchemaFactory.createForClass(Questionnaire);

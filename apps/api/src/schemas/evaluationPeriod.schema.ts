import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IEvaluationPeriod } from '../interfaces_enums/evaluationPeriod.interface';
export type EvaluationPeriodDocument = EvaluationPeriod & Document;

@Schema()
export class EvaluationPeriod implements IEvaluationPeriod {
  /**
   * MANDATORY PROPS
   */
  @Prop()
  name: string;

  @Prop()
  country: string;

  @Prop()
  creator: string;

  @Prop()
  expiration: Date;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const EvaluationPeriodSchema =
  SchemaFactory.createForClass(EvaluationPeriod);

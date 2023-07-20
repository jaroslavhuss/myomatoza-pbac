import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IPerformanceMetricInput } from 'src/interfaces_enums/IPerfMetricsInput.interface';
import { Category } from '../interfaces_enums/category.enum';
import { PerfType } from '../interfaces_enums/perftype.enum';
export type PerformanceMetricInputsDocument = PerformanceMetricInput & Document;
@Schema()
export class PerformanceMetricInput implements IPerformanceMetricInput {
  /**
   * MANDATORY PROPS
   */
  @Prop()
  name: string;
  @Prop()
  explanation: string;
  @Prop({ default: Category.INPUT })
  category: Category;
  @Prop()
  type: PerfType;
  @Prop()
  country: string;
  @Prop()
  importance: number;
  @Prop()
  creator: string;
  @Prop({ default: new Date() })
  createdAt: Date;
  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const PerformanceMetricInputSchema = SchemaFactory.createForClass(
  PerformanceMetricInput,
);

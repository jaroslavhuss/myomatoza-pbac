import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IPerformanceMetricOutput } from 'src/interfaces_enums/IPerfMetricsOutput.interface';
import { Category } from '../interfaces_enums/category.enum';
import { PerfType } from '../interfaces_enums/perftype.enum';
export type PerformanceMetricOutputDocument = PerformanceMetricOutput &
  Document;
@Schema()
export class PerformanceMetricOutput implements IPerformanceMetricOutput {
  /**
   * MANDATORY PROPS
   */
  @Prop()
  name: string;
  @Prop()
  explanation: string;
  @Prop({ default: Category.OUTPUT })
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

export const PerformanceMetricOutputSchema = SchemaFactory.createForClass(
  PerformanceMetricOutput,
);

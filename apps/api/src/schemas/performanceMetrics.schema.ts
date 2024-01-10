import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IPerformanceMetric } from '../interfaces_enums/perfromance-metrix.interface';
import { Category } from '../interfaces_enums/category.enum';
import { PerfType } from '../interfaces_enums/perftype.enum';
export type PerformanceMetricDocument = PerformanceMetric & Document;

@Schema()
export class PerformanceMetric implements IPerformanceMetric {
  /**
   * MANDATORY PROPS
   */
  @Prop()
  name: string;
  @Prop()
  explanation: string;
  @Prop()
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

export const PerformanceMetricSchema =
  SchemaFactory.createForClass(PerformanceMetric);

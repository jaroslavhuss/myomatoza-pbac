import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IPerformanceMetricCompetencies } from 'src/interfaces_enums/IPerfMetricsCompetencies.interface';
import { Category } from '../interfaces_enums/category.enum';
import { PerfType } from '../interfaces_enums/perftype.enum';
export type PerformanceMetricCompetenciesDocument =
  PerformanceMetricCompetencies & Document;
@Schema()
export class PerformanceMetricCompetencies
  implements IPerformanceMetricCompetencies
{
  /**
   * MANDATORY PROPS
   */
  @Prop()
  name: string;
  @Prop()
  explanation: string;
  @Prop({ default: Category.COMPETENCIES })
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

export const PerformanceMetricCompetenciesSchema = SchemaFactory.createForClass(
  PerformanceMetricCompetencies,
);

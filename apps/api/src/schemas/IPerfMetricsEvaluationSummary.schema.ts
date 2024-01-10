import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IPerformanceMetricEvaluationSummary } from 'src/interfaces_enums/IPerfMetricsEvaluationSummary.interface';
import { Category } from '../interfaces_enums/category.enum';
import { PerfType } from '../interfaces_enums/perftype.enum';
export type PerformanceMetricEvaluationSummaryDocument = PerformanceMetricEvaluationSummary &
  Document;
@Schema()
export class PerformanceMetricEvaluationSummary implements IPerformanceMetricEvaluationSummary {
  /**
   * MANDATORY PROPS
   */
  @Prop()
  name: string;
  @Prop()
  explanation: string;
  @Prop({ default: "evalsummary" })
  category: Category;
  @Prop({default:"standard"})
  type: PerfType;
  @Prop()
  country: string;
  @Prop()
  creator: string;
  @Prop({ default: new Date() })
  createdAt: Date;
  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const PerformanceMetricEvaluationSummarySchema = SchemaFactory.createForClass(
  PerformanceMetricEvaluationSummary,
);

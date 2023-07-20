import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IPerformanceMetricComments } from 'src/interfaces_enums/IPerfMetricsComments.interface';
import { Category } from '../interfaces_enums/category.enum';
import { PerfType } from '../interfaces_enums/perftype.enum';
export type PerformanceMetricCommentsDocument = PerformanceMetricComments &
  Document;
@Schema()
export class PerformanceMetricComments implements IPerformanceMetricComments {
  /**
   * MANDATORY PROPS
   */
  @Prop()
  name: string;
  @Prop()
  explanation: string;
  @Prop({ default: Category.COMMENTS })
  category: Category;
  @Prop()
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

export const PerformanceMetricCommentSchema = SchemaFactory.createForClass(
  PerformanceMetricComments,
);

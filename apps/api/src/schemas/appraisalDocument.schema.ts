import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IAppraisalDocument, IPerformanceMetricInput, IPerformanceMetricOutput, IPerformanceMetricComments, IPerformanceMetricCompetencies, IRatingDistribution, IPerformanceMetricEvaluationSummary } from '../interfaces_enums';

export type AppraisalDocumentDocument = AppraisalDocument & Document;
const RatingDistributionExample:IRatingDistribution = {
  a:{from:100, to:96},
  b:{from:95, to:90},
  c:{from:89, to:80},
  d:{from:79, to:60},
  e:{from:59, to:17},
  f:{from:16, to:1},
}
@Schema()
export class AppraisalDocument implements IAppraisalDocument {
  /**
   * MANDATORY PROPS
   */

 
  
   @Prop()
   country:string;

   @Prop()
   inputs:IPerformanceMetricInput[];

   @Prop()
   inputName:string;

   @Prop()
   inputDescription:string;
   @Prop()
   outputs:IPerformanceMetricOutput[];
   @Prop()
   outputName:string;
   @Prop()
   outputDescription:string;
   @Prop()
   comments: IPerformanceMetricComments[];
   @Prop()
   commentsName:string;
   @Prop()
   commentsDescription:string;
   @Prop()
   evaluationSummaries: IPerformanceMetricEvaluationSummary[];
   @Prop()
   evaluationSummaryDescription:string;
   @Prop()
   evaluationSummaryName:string;
   @Prop()
   competencies:IPerformanceMetricCompetencies[];
   @Prop()
   competenciesName:string;
   @Prop()
   competenciesDescription:string;
   @Prop()
   evaluationPeriod:string;
  @Prop()
  creator: string;
  @Prop({ default: new Date() })
  createdAt: Date;
  @Prop({ default: new Date() })
  updatedAt: Date;

  @Prop({type:Object, default:RatingDistributionExample})
  ratingDistribution:IRatingDistribution
  
}

export const AppraisalDocumentSchema =
  SchemaFactory.createForClass(AppraisalDocument);

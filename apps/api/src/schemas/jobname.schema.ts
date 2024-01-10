import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IJobname } from 'src/interfaces_enums/jobname.interface';
export type JobnameDocument = Jobname & Document;

@Schema()
export class Jobname implements IJobname {
  /**
   * MANDATORY PROPS
   */
  @Prop()
  name: string;

  @Prop()
  country: string;

  @Prop()
  description: string;

  @Prop()
  creator: string;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const JobnameSchema = SchemaFactory.createForClass(Jobname);

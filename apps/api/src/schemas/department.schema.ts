import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IDepartment } from '../interfaces_enums/department.interface';
export type DepartmentDocument = Department & Document;

@Schema()
export class Department implements IDepartment {
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

export const DepartmentSchema = SchemaFactory.createForClass(Department);

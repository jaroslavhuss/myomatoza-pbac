import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ISection } from '../interfaces_enums/section.interface';
import { Category } from 'src/interfaces_enums/category.enum';
export type SectionDocument = Section & Document;

@Schema()
export class Section implements ISection {
  /**
   * MANDATORY PROPS
   */
  @Prop()
  name: string;

  @Prop()
  country: string;

  @Prop()
  category: Category;

  @Prop()
  description: string;

  @Prop()
  creator: string;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const SectionSchema = SchemaFactory.createForClass(Section);

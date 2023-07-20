import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type CountryDocument = Country & Document;

@Schema()
export class Country {
  /**
   * MANDATORY PROPS
   */
  @Prop({ unique: true })
  name: string;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const CountrySchema = SchemaFactory.createForClass(Country);

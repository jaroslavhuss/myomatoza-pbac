import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';
import { Roles } from 'src/interfaces_enums/roles.enum';
import { SupportedCountries } from 'src/interfaces_enums/supported-countries.enum';
import { IUser } from 'src/interfaces_enums/IUser.interface';
import { IJobname } from 'src/interfaces_enums';
export type UserDocument = User & Document;

@Schema()
export class User implements IUser {
  /**
   * MANDATORY PROPS
   */
  @Prop()
  email: string;

  @Exclude()
  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop({ default: SupportedCountries.Others })
  country: SupportedCountries;

  @Prop({ default: Roles.MedicalRepresentative })
  authLevel: Roles;

  @Prop({ type: Object })
  jobName: IJobname;

  @Prop({ type: Object })
  department: {
    name: '';
    description: '';
    country: '';
    creator: '';
    createdAt: Date;
    updatedAt: Date;
    _id?: '';
    __v?: 0;
  };

  @Prop({ default: true })
  isUserApproved: boolean;

  @Prop({ default: new Date() })
  lastLoggedIn: Date;

  @Prop()
  refresh_token: string;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;

  //new props for GDPR and so on
  @Prop({ default: new Date() })
  startDateOfEmployment?: Date;
  @Prop({ default: new Date() })
  currentPositionHeldSince?: Date;
  @Prop({ default: false })
  gdprConsent?: boolean;
  @Prop({ default: new Date() })
  gdprConsentDate?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

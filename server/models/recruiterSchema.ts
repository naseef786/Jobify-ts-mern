import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { timestamps: true } })
export class Recruiter {

  public _id?: string;

  @prop({ required: true, trim: true })
  name!: string;

  @prop({  required: true })
  company!: string;

  @prop({ required: true, trim: true })
  phone!: string;

  @prop({ required: true, lowercase: true, unique: true, trim: true })
  email!: string;

  @prop({ required: true })
  tagline!: string;

  @prop({ default: true })
  discription!: string;

  @prop({ required: true, trim: true })
     website!: string;

  @prop({ required: true, minlength: 6, trim: true })
     password!: string;

  @prop()
     image?: string;

  @prop({ type: Date, default: Date.now })
     createdAt?: Date;

  @prop({ type: Date, default: Date.now })
     updatedAt?: Date;
}

export const RecruiterModel = getModelForClass(Recruiter);

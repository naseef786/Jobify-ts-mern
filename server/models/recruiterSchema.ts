import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose';
import { ObjectId, Schema } from 'mongoose';

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
  description!: string;

  @prop({ required: true, trim: true })
     website!: string;

  @prop({ required: true, minlength: 6, trim: true })
     password!: string;

  @prop({ ref: 'Job' })
     jobPosts?: Schema.Types.ObjectId[];

  @prop()
     image?: string;

     @prop()
     location?: string 
     @prop()
     about?: string
     @prop() 
     profileUrl?: string 

  @prop({ type: Date, default: Date.now })
     createdAt?: Date;

  @prop({ type: Date, default: Date.now })
     updatedAt?: Date;
     
}

export const RecruiterModel = getModelForClass(Recruiter);

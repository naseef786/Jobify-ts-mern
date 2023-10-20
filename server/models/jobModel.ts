import { modelOptions, prop,index, getModelForClass } from '@typegoose/typegoose'
import mongoose, { ObjectId, Schema } from 'mongoose';

@modelOptions({ schemaOptions: { timestamps: true } })
@index({ title: 'text', description: 'text', location: 'text', company: 'text' })

export class Job {
  public _id?: string

  @prop({ ref: 'Recruiter', required: true })
  public recruiterId!: ObjectId;

  @prop({ref: 'User' })
  public applicants?: Schema.Types.ObjectId[];

  @prop({ required: true })
  public workPlace!: string;

  
  @prop({ required: true })
  public qualification!: string;

  @prop({ required: true })
  public benefits!: string;

  @prop({ required: true })
  public shifts!: string;

  @prop({ required: true })
  title!: string;

  @prop({ required: true })
  public jobType!: string;

  @prop({ required: true })
  description!: string;

  @prop({ required: true })
  companyName!: string;

  @prop({ required: true })
  location!: string;

  @prop({ required: true })
  salary!: string;

  @prop({ required: true })
  requirements!: string;

  @prop({ default: true })
  public isActive!: boolean;

 @prop({ type: Date, default: Date.now })
  public createdAt?: Date;

  @prop({ type: Date, default: Date.now })
  public updatedAt?: Date;

  @prop({ required: true })
  public vaccancy!: string;

}

export const JobModel = getModelForClass(Job)
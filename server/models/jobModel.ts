import { modelOptions, prop,index, getModelForClass, Ref, Severity } from '@typegoose/typegoose'
import mongoose, { ObjectId, Schema } from 'mongoose';
import { User } from './userModel';






@modelOptions({ schemaOptions: { timestamps: true} })
@index({ title: 'text', description: 'text', location: 'text', company: 'text' })

export class Job {
  public _id?: string

  @prop({ ref: 'Recruiter', required: true })
  public recruiterId!: ObjectId;


  @prop({  default:[] })
  public applicants!: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      comment: {
        type: String,
      },
    },
  ]

  
  @prop({ required: true })
  public qualification!: string;

  @prop({ required: true })
  public benefits!: string;

  @prop({ required: true })
  public shifts!: string;

  @prop({ required: true })
  public jobTitle!: string;

  @prop({ required: true })
  public jobType!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ required: true })
  public recruiterName!: string;

  @prop({ required: true })
  public location!: string;

  @prop({ required: true })
  public experience!: number;

  @prop({ required: true })
  public salary!: string;

  @prop({ required: true })
  public requirements!: string;

  @prop({ required: true })
  public   responsibilities!: string;

  @prop({ default: true })
  public isActive!: boolean;

 @prop({ type: Date, default: Date.now })
  public createdAt?: Date;

  @prop({ type: Date, default: Date.now })
  public updatedAt?: Date;

  @prop({ required: true })
  public vaccancy!: string;

  @prop({ required: true })
  public profileUrl!: string;

}

export const JobModel = getModelForClass(Job)
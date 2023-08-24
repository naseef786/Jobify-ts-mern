import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';

import { JobCategory } from './JobCategorySchema'; // Import your JobCategory model class

class JobPost {
  @prop({ ref: 'Recruiter', required: true })
  public recruiterId!: ObjectId;

  @prop({ required: true })
  public jobTitle!: string;

  @prop({ required: true })
  public companyName!: string;

  @prop({ ref: JobCategory, required: true })
  public jobCategory!: Ref<JobCategory>;

  @prop({ required: true })
  public jobQualification!: string;

  @prop({ required: true })
  public vaccancy!: number;

  @prop({ required: true })
  public jobDiscription!: string;

  @prop({ required: true })
  public workPlace!: string;

  @prop({ required: true })
  public responsibilities!: string;

  @prop({ required: true })
  public salaryRange!: string;

  @prop({ required: true })
  public jobType!: string;

  @prop({ default: true })
  public isActive!: boolean;

  @prop({ default: false })
  public companyOk!: boolean;

  @prop({ default: false })
  public applied!: boolean;

  @prop()
  public image?: string;

  @prop({ required: true })
  public location!: string;

  @prop({ type: () => UserComment })
  public users!: UserComment[];

  @prop({ type: Date, default: Date.now })
  public createdAt?: Date;

  @prop({ type: Date, default: Date.now })
  public updatedAt?: Date;
}

class UserComment {
  @prop({ ref: 'User' })
  public userId!: ObjectId;

  @prop()
  public comment?: string;
}

export const JobPostModel = getModelForClass(JobPost);

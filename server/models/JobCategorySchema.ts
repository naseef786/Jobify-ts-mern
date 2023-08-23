import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: { timestamps: true } })
export class JobCategory {
  public _id?: string;

  @prop({ required: true })
  name!: string;

  @prop({ default: true })
  isActive?: boolean;
}

export const JobCategoryModel = getModelForClass(JobCategory);

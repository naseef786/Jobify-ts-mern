import { modelOptions, prop,index, getModelForClass } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true } })
@index({ title: 'text', description: 'text', location: 'text', company: 'text' })

export class Job {
  public _id?: string

  @prop({ required: true })
  title!: string;

  @prop({ required: true })
  description!: string;

  @prop({ required: true })
  company!: string;

  @prop({ required: true })
  location!: string;

  @prop({ required: true })
  salary!: number;

  @prop({ required: true })
  requirements!: string;

  @prop({ required: true })
  datePosted!: string;
}

export const JobModel = getModelForClass(Job)
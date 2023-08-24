import { prop, getModelForClass, Ref } from '@typegoose/typegoose';


class RecruiterSignup {
  @prop({ required: true, trim: true })
  public userName!: string;

  @prop({  required: true })
  public companyName!: string;

  @prop({ required: true, trim: true })
  public phoneNumber!: number;

  @prop({ required: true, lowercase: true, unique: true, trim: true })
  public email!: string;

  @prop({ required: true })
  public tagLine!: string;

  @prop({ required: true })
  public discription!: string;

  @prop({ required: true, trim: true })
  public website!: string;

  @prop({ required: true, minlength: 6, trim: true })
  public password!: string;

  @prop({ default: true })
  public isActive!: boolean;

  @prop()
  public location?: string;

  @prop()
  public image?: string;

  @prop({ type: Date, default: Date.now })
  public createdAt?: Date;

  @prop({ type: Date, default: Date.now })
  public updatedAt?: Date;
}

export const RecruiterModel = getModelForClass(RecruiterSignup);

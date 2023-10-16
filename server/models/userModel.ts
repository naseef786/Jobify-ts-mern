import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose';
import mongoose, { Schema } from 'mongoose';

@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  public _id?: string;

  @prop({ required: true })
  public name!: string;

  @prop({
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => {
        // You can use a regular expression or any other method to validate the email format.
        // This is a basic example.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email format',
    },
  })
  public email!: string;


  @prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Job' })
  public applicants?: mongoose.Types.ObjectId[];
  @prop({
    required: true,
    minlength: [6, 'Password length should be greater than 6 characters'],
  })
  public password!: string;



  @prop({ required: true, default: false })
  public isAdmin!: boolean;
}

export const UserModel = getModelForClass(User);

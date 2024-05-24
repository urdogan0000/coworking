/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, model } from 'mongoose';
import * as bcrypt from 'bcrypt';
@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, minlength: 4, maxlength: 10, trim: true })
  password: string;

  @Prop({ default: false, type: Boolean })
  admin;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const UserModel = model('User', UserSchema);
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

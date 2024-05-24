/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({timestamps:true})
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop()
  description: string;

  @Prop({ min: 1 })
  pageNumber: number;

  @Prop({ type:mongoose.Schema.Types.ObjectId,ref:'User',required:true })
  uploader;
}

export const BookSchema = SchemaFactory.createForClass(Book);

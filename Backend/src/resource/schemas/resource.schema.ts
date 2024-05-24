/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Resource extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  canRent: string;

  @Prop({ required: true })
  type: string;

  @Prop()
  description: string;

  // @Prop({ type:mongoose.Schema.Types.ObjectId,ref:'User',required:true })
  // uploader;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);

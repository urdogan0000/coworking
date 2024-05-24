/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IResourceRepository } from '../interface/resource.repository.interface';
import { Resource } from '../schemas/resource.schema';
import { ResourceDto } from '../dtos/resource.dto';
import { checkIsValidObjectId, findDocumentById } from 'src/utils/commmon.func';

@Injectable()
export class MongooseResourceRepository implements IResourceRepository {
  constructor(
    @InjectModel(Resource.name) private resourceModel: Model<Resource>,
  ) {}

  async getAllResources(): Promise<[Resource]> {
    const Resources = (await this.resourceModel.find().exec()) as [Resource];

    return Resources;
  }

  async create(resource: ResourceDto): Promise<Resource> {
    // const { title, author } = resource;
    // const existingResource = await this.resourceModel.findOne({ title, author });
    // if (existingResource) {
    //   throw new HttpException('Resource already exists', 400);
    // }

    const newResource = new this.resourceModel(resource);
    return newResource.save();
  }

  async findByIdAndUpdate(
    id: string,
    updateResourceDto: Partial<ResourceDto>,
  ): Promise<Resource> {
    try {
      checkIsValidObjectId(id);
      await findDocumentById(this.resourceModel, id);
      return this.resourceModel.findByIdAndUpdate(id, updateResourceDto, {
        new: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async findByIdAndDelete(id: string): Promise<Resource> {
    try {
      await findDocumentById(this.resourceModel, id);
      checkIsValidObjectId(id);
      return this.resourceModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: string): Promise<Resource> {
    try {
      checkIsValidObjectId(id);
      await findDocumentById(this.resourceModel, id);
      const Resource = await this.resourceModel.findById(id);

      return Resource;
    } catch (error) {
      throw error;
    }
  }
}

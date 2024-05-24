/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';

import {
  IResourceRepository,
  RESOURCE_REPOSITORY,
} from './interface/resource.repository.interface';
import { ResourceDto } from './dtos/resource.dto';
import { Resource } from './schemas/resource.schema';

@Injectable()
export class ResourceService {
  constructor(
    @Inject(RESOURCE_REPOSITORY)
    private readonly resourceRepository: IResourceRepository,
  ) {}

  async getAllBooks(): Promise<[Resource]> {
    return await this.resourceRepository.getAllResources();
  }

  async findOneById(id: string): Promise<Resource> {
    try {
      return await this.resourceRepository.findOneById(id);
    } catch (error) {
      throw error;
    }
  }

  async create(ResourceDto: ResourceDto) {
    const Resource = await this.resourceRepository.create(ResourceDto);

    return Resource;
  }

  async updateById(
    id: string,
    updateBookDto: Partial<ResourceDto>,
  ): Promise<Resource> {
    const existingBook = await this.resourceRepository.findByIdAndUpdate(
      id,
      updateBookDto,
      { new: true },
    );
    return existingBook;
  }

  async deleteOneById(id: string): Promise<Resource> {
    const deletedBook = await this.resourceRepository.findByIdAndDelete(id);
    return deletedBook;
  }
}

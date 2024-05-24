/* eslint-disable prettier/prettier */

import { ResourceDto } from '../dtos/resource.dto';
import { Resource } from '../schemas/resource.schema';

export const RESOURCE_REPOSITORY = 'RESOURCE_REPOSITORY';

export interface IResourceRepository {
  findOneById(id: string): Resource | PromiseLike<Resource>;
  findByIdAndDelete(id: string): Promise<Resource>;
  findByIdAndUpdate(
    id: string,
    updateBookDto: Partial<ResourceDto>,
    arg2: { new: boolean },
  ): Promise<Resource>;
  create(bookDto: ResourceDto): Promise<Resource>;
  getAllResources(): Promise<[Resource] | null>;
}

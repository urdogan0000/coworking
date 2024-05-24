/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { Resource, ResourceSchema } from './schemas/resource.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RESOURCE_REPOSITORY } from './interface/resource.repository.interface';
import { MongooseResourceRepository } from './repository/resource.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Resource.name, schema: ResourceSchema },
    ]),
  ],
  controllers: [ResourceController],
  providers: [
    ResourceService,
    {
      provide: RESOURCE_REPOSITORY,
      useClass: MongooseResourceRepository,
    },
  ],
})
export class ResourceModule {}

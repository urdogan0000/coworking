/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { Model } from 'mongoose';
import { schemaComposer } from 'graphql-compose';

@Injectable()
export class SchemaGenerationService {
  generateFromModels(models: { name: string; model: Model<any> }[]) {
    models.forEach(({ name, model }) => {
      const ModelTC = composeWithMongoose(model, { name });
      schemaComposer.Query.addFields({
        [`${name.toLowerCase()}ById`]: ModelTC.getResolver('findById'),
        [`${name.toLowerCase()}Many`]: ModelTC.getResolver('findMany'),
      });
      schemaComposer.Mutation.addFields({
        [`${name.toLowerCase()}CreateOne`]: ModelTC.getResolver('createOne'),
        [`${name.toLowerCase()}UpdateById`]: ModelTC.getResolver('updateById'),
      });
    });
    return schemaComposer.buildSchema();
  }
}



import { Module } from '@nestjs/common';


@Module({
  providers: [SchemaGenerationService],
  exports: [SchemaGenerationService], // Make sure to export the service
})
export class GraphqlSchemaModule {}
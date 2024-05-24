/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterModule } from './user/user.module';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { BookModule } from './books/book.module';
import { ResourceModule } from './resource/resource.module';
/*     GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [GraphqlSchemaModule],
      useFactory: async (schemaGenerationService: SchemaGenerationService) => {
        const generatedSchema = schemaGenerationService.generateFromModels([
          { name: 'User', model: mongoose.model('User')  },
          // Add more models here
        ]);
        return {
          autoSchemaFile: 'schema.gql',
          transformSchema: (schema) => {
          
            // Add types from the generated schema to the existing schema
            Object.values(generatedSchema.getTypeMap()).forEach((type) => {
              if (typeof type.name === 'string' && !type.name.startsWith('__')) {
                schemaComposer.addSchemaMustHaveType(type);
              }
            });
            return schemaComposer.buildSchema();
          },
        };
      },
      inject: [SchemaGenerationService],
    }),*/
@Module({
  imports: [
    ResourceModule,
    BookModule,
    MongooseModule.forRoot(
      'mongodb+srv://test1:test1@cluster0.ya0reey.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    RegisterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

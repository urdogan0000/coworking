import { HttpException, Logger } from '@nestjs/common';
import { Types } from 'mongoose';

const checkIsValidObjectId = (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new HttpException('Wrong object id: ' + id, 400);
  }
};

const findDocumentById = async (model, id: string) => {
  const document = await model.findById(id);

  if (!document) {
    Logger.error(
      `Error while finding document in ----- ${model.modelName} ----- with id ${id}`,
    );
    throw new HttpException('Object not found with this id: ' + id, 400);
  }
};

export { checkIsValidObjectId, findDocumentById };

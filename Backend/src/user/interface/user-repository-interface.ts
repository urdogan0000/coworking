/* eslint-disable prettier/prettier */

import { RegisterDto } from '../dtos/register.dto';
import { User } from '../schemas/user.schema';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUserRepository {
  create(user: RegisterDto): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  update(id: string, user: Partial<User>): Promise<User>; 
  
}

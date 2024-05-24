/* eslint-disable prettier/prettier */

import { User } from '../schemas/user.schema';
import { UserType } from '../types/login.type';

export const toUserType = (user: User): UserType => ({
  _id: user._id.toString(),
  email: user.email,
  username: user.username,
});
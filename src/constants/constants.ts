import { Role } from '../roles/models/role.model';

export enum UserRolesEnum {
  admin = 'admin',
  user = 'user',
  moderator = 'moderator',
}

export type TokenPayload = {
  email: string;
  id: number;
  roles: Role[];
};

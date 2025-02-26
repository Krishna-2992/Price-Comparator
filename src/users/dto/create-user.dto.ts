import { Role } from '../../common/enums/role.enum';

export class CreateUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly role?: Role;
  readonly firstName?: string;
  readonly lastName?: string;
}

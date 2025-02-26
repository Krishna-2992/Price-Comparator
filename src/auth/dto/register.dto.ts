import { Role } from '../../common/enums/role.enum';

export class RegisterDto {
  username: string;
  email: string;
  password: string;
  role?: Role;
}

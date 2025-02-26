import { Role } from 'src/common/enums/role.enum';

export interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    role: Role;
  };
}

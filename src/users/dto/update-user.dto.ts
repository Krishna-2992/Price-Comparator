// src/users/dto/update-user.dto.ts
export class UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
}

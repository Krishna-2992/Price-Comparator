import {
  Controller,
  Get,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RequestWithUser } from './interfaces/RequestWithUser.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const users = await this.userService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Users retrieved successfully',
      data: users,
    };
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @Req() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.update(
      req.user.id,
      updateUserDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Profile updated successfully',
      data: updatedUser,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    if (
      req.user.id === id ||
      [Role.ADMIN, Role.SUPERADMIN].includes(req.user.role)
    ) {
      await this.userService.remove(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully',
      };
    }
    throw new UnauthorizedException('You cannot delete this user');
  }
}

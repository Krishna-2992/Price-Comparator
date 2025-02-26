import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  HttpStatus,
  HttpCode, // Import Req instead of Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { RequestWithUser } from 'src/users/interfaces/RequestWithUser.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.login(loginDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      data: result,
    };
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register({
      ...registerDto,
      role: Role.USER,
    });
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User registered successfully',
      data: user,
    };
  }

  @Post('register/admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPERADMIN)
  @HttpCode(HttpStatus.CREATED)
  async registerAdmin(@Body() registerDto: RegisterDto) {
    const admin = await this.authService.register({
      ...registerDto,
      role: Role.ADMIN,
    });
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Admin registered successfully',
      data: admin,
    };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  getProfile(@Req() req: RequestWithUser) {
    return {
      statusCode: HttpStatus.OK,
      message: 'Profile retrieved successfully',
      data: {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role,
      },
    };
  }
}

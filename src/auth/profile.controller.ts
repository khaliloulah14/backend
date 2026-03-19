import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service'; // Injection du service

interface AuthenticatedRequest extends Request {
  user: { userId: number };
}

@Controller('profile')
export class ProfileController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Request() req: AuthenticatedRequest) {
    return this.authService.getProfile(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('details')
  async getProfileDetails(@Request() req: AuthenticatedRequest) {
    return this.authService.getProfile(req.user.userId); // Retourne l'entité complète
  }
}

import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard'; // Suppose un guard JWT défini

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body() body: { username: string; password: string; email: string },
  ) {
    await this.authService.signUp(body.username, body.password, body.email);
  }

  @Post('signin')
  async signIn(@Body() body: { username: string; password: string }) {
    return this.authService.signIn(body.username, body.password);
  }

  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    const accessToken = await this.authService.refresh(body.refreshToken);
    return { accessToken };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request & { user: { userId: number } }) {
    return this.authService.getProfile(req.user.userId);
  }
}

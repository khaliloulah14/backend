import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(
    username: string,
    password: string,
    email: string,
  ): Promise<void> {
    // Validation basique
    if (!username || !password || !email) {
      throw new BadRequestException(
        'Username, password, and email are required',
      );
    }
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.usersRepository.findOne({
      where: [{ username }, { email }],
    });
    if (existingUser) {
      throw new BadRequestException(
        'User with this username or email already exists',
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
      email,
    });
    await this.usersRepository.save(user);
  }

  async signIn(
    username: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' }); // Expiration plus longue pour refresh
    // Stocker le refresh token (suppose un champ refreshToken dans User)
    user.refreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.save(user);
    return { accessToken, refreshToken };
  }

  async getProfile(userId: number): Promise<{ id: number; username: string; email: string }> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    // Retourner uniquement les champs publics pour éviter la fuite de données sensibles (password et refreshToken)
    return { id: user.id, username: user.username, email: user.email };
  }

  async refresh(refreshToken: string): Promise<string> {
    try {
      const payload = this.jwtService.verify(refreshToken) as { sub: number; username: string };
      const user = await this.usersRepository.findOneBy({ id: payload.sub });
      if (!user || !(await bcrypt.compare(refreshToken, user.refreshToken))) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      const newPayload = { username: user.username, sub: user.id };
      return this.jwtService.sign(newPayload);
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}

/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-require-imports */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

// Supprimer les imports passport et PassportJwt — utiliser require uniquement
const { ExtractJwt, Strategy } = require('passport-jwt');

interface JwtPayload {
  sub: number;
  username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'mon_secret_jwt',
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return { sub: payload.sub, username: payload.username };
  }
}

import {
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err || !user) {
      if (info?.name === 'JsonWebTokenError') {
        throw new HttpException('Token inválido o faltante', HttpStatus.FORBIDDEN);
      }
      throw new HttpException('No autorizado', HttpStatus.FORBIDDEN);
    }
    return user;
  }
}

import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // You can add custom authentication logic here, for example checking roles or permissions
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context) {
    const request = context.switchToHttp().getRequest();

    if (err || !user) {
      // Throw an unauthorized exception if user is not authenticated
      throw err || new UnauthorizedException();
    }

    request.headers['user-info'] = JSON.stringify(this.extractUserInfo(user));

    return user;
  }
  private extractUserInfo(user: any): any {
    // Simplify the user object as needed
    return {
      id: user.userId,
      username: user.username,
    };
  }
}

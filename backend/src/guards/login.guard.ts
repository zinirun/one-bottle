import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = GqlExecutionContext.create(context).getContext().req;
        const token = request.cookies && request.cookies['x-access-token'];
        if (!token) {
            return false;
        }
        const user = this.authService.verifyToken(token);
        if (!user) {
            return false;
        }
        request.user = user;
        return true;
    }
}

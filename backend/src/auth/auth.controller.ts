import { Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Request() req: any) {}

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Request() req: any, @Response() res: any): Promise<Response> {
        return await this.authService.oAuthLogin(req, res);
    }

    @Get('github')
    @UseGuards(AuthGuard('github'))
    async githubAuth(@Request() req: any) {}

    @Get('github/redirect')
    @UseGuards(AuthGuard('github'))
    async githubAuthRedirect(@Request() req: any, @Response() res: any): Promise<Response> {
        return await this.authService.oAuthLogin(req, res);
    }

    @Post('logout')
    async logout(@Response() res: any): Promise<Response> {
        return await this.authService.logout(res);
    }
}

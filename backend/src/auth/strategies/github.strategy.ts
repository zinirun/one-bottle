import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';
import { config } from 'dotenv';
import { Profile } from 'passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { UserAuthDto } from 'src/user/user.auth.dto';

config();

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
    constructor(private readonly userService: UserService) {
        super({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_SECRET,
            callbackURL: `${process.env.SERVER_ADDR}/auth/github/redirect`,
            scope: ['user', 'profile'],
        });
    }

    async validate(
        _accessToken: string,
        _refreshToken: string,
        { provider, id, displayName, emails }: Profile,
    ): Promise<User> {
        const userAuth: UserAuthDto = {
            provider,
            providerId: id,
            username: displayName || 'Anonymous',
            email: emails ? emails[0].value : null,
        };
        const user = await this.userService.findOrCreate(userAuth);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}

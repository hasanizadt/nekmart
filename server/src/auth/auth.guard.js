import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class AuthGuard {
    //Constructor
    constructor(userRepository, sessionRepository, jwtService) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
        this.jwtService = jwtService;
    }

    //CanActivate
    async canActivate(context) {
        const ctx = GqlExecutionContext.create(context).getContext();
        if (!ctx.req?.cookies?.["9717f25d01fb469d5d6a3c6c70e1919aebec"]) {
            return false
        }
        ctx.user = await this.validToken(ctx.req?.cookies?.["9717f25d01fb469d5d6a3c6c70e1919aebec"]);
        return true;
    }
    //Valid token
    async validToken(cookie) {
        try {
            const decode = this.jwtService.verify(cookie);
            const user = await this.userRepository.findOne({
                where: [
                    { id: decode.id, phone: decode.phone }
                ]
            });
            if (!user || user.is_banned) throw new HttpException("Unauthorized Request", HttpStatus.UNAUTHORIZED);
            const session = await this.sessionRepository.findOneBy({
                cookie: cookie
            });
            if (!session) throw new HttpException("Unauthorized Request", HttpStatus.UNAUTHORIZED);
            return user;
        } catch (err) {
            throw new HttpException("Unauthorized Request", HttpStatus.UNAUTHORIZED);
        }
    }
}
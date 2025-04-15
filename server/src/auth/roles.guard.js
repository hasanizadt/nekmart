import { Injectable } from '@nestjs/common';

//Decorator
import { ROLES_KEY } from './decorator/auth.decorator';

@Injectable()
export class RolesGuard {
    //Constructor
    constructor(reflector) {
        this.reflector = reflector;
    }

    //Can activate
    async canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getNext();
        return requiredRoles.some((role) => user.role?.includes(role));
    }
}
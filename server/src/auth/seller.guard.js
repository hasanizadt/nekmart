import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class SellerGuard {
    //Constructor
    constructor(sellerRepository) {
        this.sellerRepository = sellerRepository;
    }

    //Can activate
    async canActivate(context) {
        try {
            const { user } = context.switchToHttp().getNext();
            const seller = await this.sellerRepository.findOne({
                where: {
                    user: user.id,
                    is_verified: true,
                    is_banned: false
                }
            });
            if (!seller) throw new HttpException("Unauthorized Request", HttpStatus.UNAUTHORIZED);
            return true;
        } catch {
            throw new HttpException("Unauthorized Request", HttpStatus.UNAUTHORIZED);
        }
    }
}
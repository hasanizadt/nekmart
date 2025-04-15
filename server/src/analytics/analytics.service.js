import { Injectable } from "@nestjs/common";

@Injectable()
export class AnalyticsService {
    //Constructor
    constructor(cartRepository, wishlistRepository, orderRepository, addressRepository) {
        this.cartRepository = cartRepository;
        this.wishlistRepository = wishlistRepository;
        this.orderRepository = orderRepository;
        this.addressRepository = addressRepository;
    }

    //Get analytics for user dashboard
    async user(reqUser) {
        const totalCart = await this.cartRepository.count({
            where: {
                user: { id: reqUser.id }
            }
        });
        const totalWishlist = await this.wishlistRepository.count({
            where: {
                user: { id: reqUser.id }
            }
        });
        const totalOrder = await this.orderRepository.count({
            where: {
                user: { id: reqUser.id }
            }
        });
        const defaultAddress = await this.addressRepository.findOne({
            where: {
                user: { id: reqUser.id },
                default: true
            }
        })
        return {
            totalCart,
            totalWishlist,
            totalOrder,
            defaultAddress
        }
    }
}
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class WishlistService {
    //Constructor
    constructor(wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    };

    //Get wishlist
    async get(reqUser) {
        const wishlist = await this.wishlistRepository.find({
            where: {
                user: { id: reqUser.id }
            },
            relations: {
                product: true,
                user: true
            }
        });
        return wishlist;
    }

    //Check Wishlist
    async check(reqUser, productId) {
        const wishlist = await this.wishlistRepository.findOneBy({
            user: { id: reqUser.id },
            product: { id: productId }
        });
        if (wishlist) return {
            status: true,
            message: "Product has in wishlist!"
        }
        else return {
            status: false,
            message: "Product has not in wishlist!"
        }
    };

    //Add wishlist
    async add(wishlistInput, reqUser) {
        const wishlist = await this.wishlistRepository.findOneBy({
            user: { id: reqUser.id },
            product: { id: wishlistInput.productId }
        });
        if (wishlist) {
            await this.wishlistRepository.delete({
                user: { id: reqUser.id },
                product: { id: wishlistInput.productId }
            });
            return {
                success: true,
                message: "Product delete from wishlist successfully!"
            }
        } else {
            const newWishlist = this.wishlistRepository.create({
                product: { id: wishlistInput.productId },
                user: { id: reqUser.id }
            });
            await this.wishlistRepository.save(newWishlist);
            return {
                success: true,
                message: "Product added to wishlist successfully!"
            }
        }
    }

    //Delete Wishlist
    async delete(id) {
        try {
            const result = await this.wishlistRepository.delete(id);
            if (result.affected === 0) throw new NotFoundException("Wishlist not found!");
        } catch {
            throw new NotFoundException("Cannot delete wishlist because it has related record!");
        }
        return {
            success: true,
            message: "Wishlist Deleted Successfully!"
        }
    }
}
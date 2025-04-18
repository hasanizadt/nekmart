import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class CartService {
    //Constructor
    constructor(cartRepository) {
        this.cartRepository = cartRepository;
    };

    //Get Carts
    async get(reqUser) {
        const carts = await this.cartRepository.find({
            where: {
                user: { id: reqUser.id }
            },
            relations: {
                productId: {
                    attributes: true
                },
                seller: true,
                user: true
            },
            order: {
                created_at: "DESC"
            }
        });
        return carts;
    };

    //Add cart
    async add(cartInput, reqUser) {
        const cart = await this.cartRepository.findOne({
            where: {
                productId: { id: cartInput.productId },
                user: { id: reqUser.id }
            }
        });
        if (cart) throw new NotFoundException("Product exist to cart!");
        const newCart = this.cartRepository.create({
            ...cartInput,
            productId: { id: cartInput.productId },
            seller: { id: cartInput.seller },
            user: { id: reqUser.id }
        });
        await this.cartRepository.save(newCart);
        return {
            success: true,
            message: "Product added to cart successfully!"
        }
    };

    //Increase Cart Quantity
    async increase(id, reqUser) {
        const cart = await this.cartRepository.findOne({
            where: {
                id: id,
                user: { id: reqUser.id }
            },
            relations: {
                productId: true
            }
        });
        if (!cart) throw new NotFoundException("Cart not found!");
        await this.cartRepository.increment({
            id: id,
            user: { id: reqUser.id }
        }, "reserved", 1);
        return {
            success: true,
            message: "Cart updated successfully!"
        }
    };

    //Decrease Cart Quantity
    async decrease(id, reqUser) {
        const result = await this.cartRepository.decrement({
            id: id,
            user: { id: reqUser.id }
        }, "reserved", 1);
        if (result.affected === 0) throw new NotFoundException("Cart not found!");
        return {
            success: true,
            message: "Cart updated successfully!"
        }
    };

    //Delete Cart
    async delete(id, reqUser) {
        try {
            const result = await this.cartRepository.delete({
                id: id,
                user: { id: reqUser.id }
            });
            if (result.affected === 0) throw new NotFoundException("Cart not found!");
        } catch {
            throw new NotFoundException("Cannot delete cart because it has related record!");
        }
        return {
            success: true,
            message: "Cart Deleted Successfully!"
        }
    }
}
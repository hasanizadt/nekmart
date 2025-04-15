import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { Wishlist } from "./entities/wishlist.entity";
import { CheckWishlist } from "./entities/check-wishlist.entity";

//Guard
import { AuthGuard } from "@/auth/auth.guard";

@Resolver(Wishlist)
export class WishlistResolver {
    //Constructor
    constructor(wishlistService) {
        this.wishlistService = wishlistService;
    };

    //Get wishlist
    @Query(() => [Wishlist], { name: "getWishlist" })
    @UseGuards(AuthGuard)
    get(
        @Context("user")
        reqUser
    ) {
        return this.wishlistService.get(reqUser);
    };

    //Check wishlist
    @Query(() => CheckWishlist, { name: "checkWishlist" })
    @UseGuards(AuthGuard)
    check(
        @Args("productId", { type: () => String })
        productId,
        @Context("user")
        reqUser
    ) {
        return this.wishlistService.check(reqUser, productId);
    };

    //Add Wishlist
    @Mutation(() => SuccessInfo, { name: "addWishlist" })
    @UseGuards(AuthGuard)
    add(
        @Args("wishlistInput")
        wishlistInput,
        @Context("user")
        reqUser
    ) {
        return this.wishlistService.add(wishlistInput, reqUser);
    }

    //Delete Wishlist
    @Mutation(() => SuccessInfo, { name: "deleteWishlist" })
    @UseGuards(AuthGuard)
    delete(
        @Args("id", { type: () => String })
        id
    ) {
        return this.wishlistService.delete(id);
    }
}
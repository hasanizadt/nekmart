import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { Cart } from "./entities/cart.entity";

//Guard
import { AuthGuard } from "@/auth/auth.guard";

@Resolver(Cart)
export class CartResolver {
    //Constructor
    constructor(cartService) {
        this.cartService = cartService;
    };

    //Get Carts
    @Query(() => [Cart], { name: "getCarts" })
    @UseGuards(AuthGuard)
    get(
        @Context("user")
        reqUser
    ) {
        return this.cartService.get(reqUser);
    };

    //Add Cart
    @Mutation(() => SuccessInfo, { name: "addCart" })
    @UseGuards(AuthGuard)
    add(
        @Args("cartInput")
        cartInput,
        @Context("user")
        reqUser
    ) {
        return this.cartService.add(cartInput, reqUser);
    };

    //Increase cart quantity
    @Mutation(() => SuccessInfo, { name: "increaseCart" })
    @UseGuards(AuthGuard)
    increase(
        @Args("id", { type: () => String })
        id,
        @Context("user")
        reqUser
    ) {
        return this.cartService.increase(id, reqUser);
    };

    //Decrease cart quantity
    @Mutation(() => SuccessInfo, { name: "decreaseCart" })
    @UseGuards(AuthGuard)
    decrease(
        @Args("id", { type: () => String })
        id,
        @Context("user")
        reqUser
    ) {
        return this.cartService.decrease(id, reqUser);
    };

    //Delete Cart 
    @Mutation(() => SuccessInfo, { name: "deleteCart" })
    @UseGuards(AuthGuard)
    delete(
        @Args("id", { type: () => String })
        id,
        @Context("user")
        reqUser
    ) {
        return this.cartService.delete(id, reqUser);
    };
}
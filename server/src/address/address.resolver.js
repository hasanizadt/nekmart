import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { Address } from "./entities/address.entity";

//Guard
import { AuthGuard } from "@/auth/auth.guard";

@Resolver()
export class AddressResolver {
    //Constructor
    constructor(addressService) {
        this.addressService = addressService;
    };

    //Get Address
    @Query(() => [Address], { name: "getAddress" })
    @UseGuards(AuthGuard)
    get(
        @Context("user")
        reqUser
    ) {
        return this.addressService.get(reqUser);
    };

    //Add Address
    @Mutation(() => SuccessInfo, { name: "addAddress" })
    @UseGuards(AuthGuard)
    add(
        @Args("addressInput")
        addressInput,
        @Context("user")
        reqUser
    ) {
        return this.addressService.add(addressInput, reqUser);
    };

    //Update Address 
    @Mutation(() => SuccessInfo, { name: "updateAddress" })
    @UseGuards(AuthGuard)
    update(
        @Args("addressInput")
        addressInput,
        @Args("id", { type: () => String })
        id
    ) {
        return this.addressService.update(addressInput, id);
    };

    // Mark address as Default
    @Mutation(() => SuccessInfo, { name: "markAddDefault" })
    @UseGuards(AuthGuard)
    mark(
        @Args("id", { type: () => String })
        id,
        @Context("user")
        reqUser
    ) {
        return this.addressService.mark(id, reqUser);
    };

    //Delete Address 
    @Mutation(() => SuccessInfo, { name: "deleteAddress" })
    @UseGuards(AuthGuard)
    delete(
        @Args("id", { type: () => String })
        id
    ) {
        return this.addressService.delete(id);
    }
}
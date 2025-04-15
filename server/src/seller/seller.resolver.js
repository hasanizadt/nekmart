import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { GetSellers, Seller } from "./entities/seller.entity";

//Guard
import { Roles } from "@/auth/decorator/auth.decorator";
import { Role } from "@/auth/enum/auth.enum";
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";


@Resolver(Seller)
export class SellerResolver {
    //Constructor
    constructor(sellerService) {
        this.sellerService = sellerService;
    }

    //Get sellers for client
    @Query(() => GetSellers, { name: "getSellers" })
    gets(
        @Args("searchInput")
        searchInput
    ) {
        return this.sellerService.gets(searchInput);
    };

    //Get sellers for admin
    @Query(() => GetSellers, { name: "getSellersByAdmin" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getsByAdmin(
        @Args("searchInput")
        searchInput
    ) {
        return this.sellerService.getsByAdmin(searchInput);
    };

    //Get Single seller for client
    @Query(() => Seller, { name: "getSeller" })
    getByUser(
        @Args("id", { type: () => String })
        id
    ) {
        return this.sellerService.get(id);
    };

    //Get single seller for admin
    @Query(() => Seller, { name: "getSellerByAdmin" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getByAdmin(
        @Args("id", { type: () => String })
        id
    ) {
        return this.sellerService.getByAdmin(id);
    };

    //Get seller profile
    @Query(() => Seller, { name: "getSellerProfile" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard)
    getProfile(
        @Context("user")
        reqUser
    ) {
        return this.sellerService.getProfile(reqUser);
    };

    //Create seller
    @Mutation(() => SuccessInfo, { name: "createSeller" })
    create(
        @Args("sellerInput")
        sellerInput
    ) {
        return this.sellerService.create(sellerInput);
    };

    //Verify Seller Phone
    @Mutation(() => SuccessInfo, { name: "verifySellerPhone" })
    verifyPhone(
        @Args("sellerVerifyInput")
        sellerVerifyInput
    ) {
        return this.sellerService.verifyPhone(sellerVerifyInput);
    };

    //Update seller
    @Mutation(() => SuccessInfo, { name: "updateSeller" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard)
    update(
        @Args("updateSellerInput")
        updateSellerInput,
        @Args("id", { type: () => String })
        id
    ) {
        return this.sellerService.update(id, updateSellerInput);
    };

    //Banned a seller
    @Mutation(() => SuccessInfo, { name: "banOrUnbannedSeller" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    ban(
        @Args("id", { type: () => String })
        id,
        @Args("status", { type: () => Boolean })
        status
    ) {
        return this.sellerService.ban(id, status);
    };

    //Seller verification
    @Mutation(() => SuccessInfo, { name: "verifySeller" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    verify(
        @Args("id", { type: () => String })
        id
    ) {
        return this.sellerService.verify(id);
    }

    //Add bank information
    @Mutation(() => SuccessInfo, { name: "addBankInformation" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard)
    bank(
        @Args("bankInput")
        bankInput,
        @Context("user")
        reqUser
    ) {
        return this.sellerService.bank(bankInput, reqUser);
    };
}
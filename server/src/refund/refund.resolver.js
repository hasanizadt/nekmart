import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { Refund, GetRefund } from "./entities/refund.entity";
import { Refundable } from "./entities/refundable.entity";

//Guard
import { Roles } from "@/auth/decorator/auth.decorator";
import { Role } from "@/auth/enum/auth.enum";
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";

@Resolver()
export class RefundResolver {
    //Constructor
    constructor(refundService) {
        this.refundService = refundService;
    };

    //Get Refundable products
    @Query(() => [Refundable], { name: "getRefundableProducts" })
    @UseGuards(AuthGuard)
    refundable(
        @Context("user")
        reqUser
    ) {
        return this.refundService.refundable(reqUser);
    }

    //Get Refund by user
    @Query(() => [Refund], { name: "getRefundByUser" })
    @UseGuards(AuthGuard)
    getByUser(
        @Context("user")
        reqUser
    ) {
        return this.refundService.getByUser(reqUser);
    };

    //Get Refund by Admin
    @Query(() => GetRefund, { name: "getRefundByAdmin" })
    @Roles(Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getByAdmin(
        @Args("searchInput")
        searchInput
    ) {
        return this.refundService.getByAdmin(searchInput);
    }

    //Add Refund
    @Mutation(() => SuccessInfo, { name: "addRefund" })
    @UseGuards(AuthGuard)
    add(
        @Args("refundInput")
        refundInput,
        @Context("user")
        reqUser
    ) {
        return this.refundService.add(refundInput, reqUser);
    };

    //Change status
    @Mutation(() => SuccessInfo, { name: "changeRefundStatus" })
    @Roles(Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    change(
        @Args("id", { type: () => String })
        id,
        @Args("refundStatusInput")
        refundStatusInput
    ) {
        return this.refundService.change(id, refundStatusInput);
    };
}
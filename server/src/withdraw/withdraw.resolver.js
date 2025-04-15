import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { Withdraw, GetWithdraw } from "./entities/withdraw.entities";
import { GetIncomes } from "./entities/income.entities";
import { IncomeStatics } from "./entities/income-statics.entity";

//Guard
import { Roles } from "@/auth/decorator/auth.decorator";
import { Role } from "@/auth/enum/auth.enum";
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";


@Resolver()
export class WithdrawResolver {
    //Constructor
    constructor(withdrawService) {
        this.withdrawService = withdrawService;
    }

    //Get withdrawal from admin
    @Query(() => GetWithdraw, { name: "getWithdrawalByAdmin" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getByAdmin(
        @Args("sellerId", { type: () => String })
        sellerId,
        @Args("searchInput")
        searchInput
    ) {
        return this.withdrawService.getByAdmin(sellerId, searchInput);
    };

    //Get Withdraw from seller
    @Query(() => GetWithdraw, { name: "getWithdrawalBySeller" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard)
    getBySeller(
        @Args("searchInput")
        searchInput,
        @Context("user")
        reqUser
    ) {
        return this.withdrawService.getBySeller(searchInput, reqUser);
    };

    //Get Income History
    @Query(() => GetIncomes, { name: "getIncomeHistory" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard)
    getIncome(
        @Args("searchInput")
        searchInput,
        @Context("user")
        reqUser
    ) {
        return this.withdrawService.getIncome(searchInput, reqUser);
    };

    //Get Income Statics
    @Query(() => IncomeStatics, { name: "getIncomeStatics" })
    @Roles(Role.SELLER, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getStatics(
        @Args("sellerId", { type: () => String })
        sellerId,
        @Context("user")
        reqUser
    ) {
        return this.withdrawService.getStatics(sellerId, reqUser);
    };

    //Get processing payment from seller
    @Query(() => [Withdraw], { name: "getProcessingWithdraw" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard)
    getProcessing(
        @Context("user")
        reqUser
    ) {
        return this.withdrawService.process(reqUser);
    }

    //Release payment
    @Mutation(() => SuccessInfo, { name: "releasePayment" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    release(
        @Args("paymentInput")
        paymentInput,
        @Context("user")
        reqUser
    ) {
        return this.withdrawService.release(paymentInput, reqUser);
    }

    //Confirm payment by seller
    @Mutation(() => SuccessInfo, { name: "confirmPayment" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard)
    confirm(
        @Args("withdrawId", { type: () => String })
        withdrawId
    ) {
        return this.withdrawService.confirm(withdrawId);
    }
}
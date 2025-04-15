import { Resolver, Query, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Entity
import { UserAnalytics } from "./entities/analytics-user.entity";

import { AuthGuard } from "@/auth/auth.guard";

@Resolver()
export class AnalyticsResolver {
    //Constructor
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
    }

    //Get Analytics for user dashboard
    @Query(() => UserAnalytics, { name: "getAnalyticsByUser" })
    @UseGuards(AuthGuard)
    user(
        @Context("user")
        reqUser
    ) {
        return this.analyticsService.user(reqUser);
    }
}
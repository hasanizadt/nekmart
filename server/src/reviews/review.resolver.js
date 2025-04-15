import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { Review, GetReviews } from "./entities/reviews.entity";

//Guard
import { Roles } from "@/auth/decorator/auth.decorator";
import { Role } from "@/auth/enum/auth.enum";
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";


@Resolver(Review)
export class ReviewResolver {
    //Constructor
    constructor(reviewService) {
        this.reviewService = reviewService;
    };

    //Get reviews by product
    @Query(() => [Review], { name: "getReviewByProduct" })
    getReviews(
        @Args("productId", { type: () => String })
        productId
    ) {
        return this.reviewService.getReviews(productId);
    };

    //Get reviews by admin
    @Query(() => GetReviews, { name: "getReviewByAdmin" })
    @Roles(Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getReviewsByAdmin(
        @Args("searchInput")
        searchInput
    ) {
        return this.reviewService.getReviewsByAdmin(searchInput);
    };

    //Get reviews by seller
    @Query(() => GetReviews, { name: "getReviewBySeller" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard)
    getReviewBySeller(
        @Args("searchInput")
        searchInput,
        @Context("user")
        reqUser
    ) {
        return this.reviewService.getReviewBySeller(reqUser, searchInput);
    }

    // Check review is available
    @Query(() => SuccessInfo, { name: "reviewAvailability" })
    @UseGuards(AuthGuard)
    check(
        @Args("checkReviewInput")
        checkReviewInput,
        @Context("user")
        reqUser
    ) {
        return this.reviewService.check(checkReviewInput, reqUser);
    };

    //Add Reviews
    @Mutation(() => SuccessInfo, { name: "addReviews" })
    @UseGuards(AuthGuard)
    add(
        @Args("reviewInput")
        reviewInput,
        @Context("user")
        reqUser
    ) {
        return this.reviewService.add(reviewInput, reqUser);
    };

    //Reply reviews
    @Mutation(() => SuccessInfo, { name: "replyReview" })
    @Roles(Role.SELLER)
    @UseGuards(AuthGuard, RolesGuard)
    reply(
        @Args("replyInput")
        replyInput
    ) {
        return this.reviewService.reply(replyInput);
    }

    //Change review visibility
    @Mutation(() => SuccessInfo, { name: "changeReviewVisibility" })
    @Roles(Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard)
    visibility(
        @Args("reviewId", { type: () => String })
        reviewId
    ) {
        return this.reviewService.visibility(reviewId);
    };
}
import { Resolver, Query, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Entities
import { Points } from "./entities/points.entity";
import { UserPoints } from "./entities/user-points.entity";

//Guards
import { AuthGuard } from "@/auth/auth.guard";

@Resolver()
export class PointResolver {
    //Constructor
    constructor(pointService) {
        this.pointService = pointService;
    };

    //Get points
    @Query(() => [Points], { name: "getPoints" })
    @UseGuards(AuthGuard)
    get(
        @Context("user")
        reqUser
    ) {
        return this.pointService.get(reqUser);
    }

    //Get User Points
    @Query(() => UserPoints, { name: "getUserPoints" })
    @UseGuards(AuthGuard)
    getPoints(
        @Context("user")
        reqUser
    ) {
        return this.pointService.getPoints(reqUser);
    }

}
import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { GetFlashes, Flash } from "./entities/flash.entity";

//Guard
import { Roles } from "@/auth/decorator/auth.decorator";
import { Role } from "@/auth/enum/auth.enum";
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";

@Resolver()
export class FlashResolver {
    //Constructor
    constructor(flashService) {
        this.flashService = flashService;
    };

    //Get Flashes
    @Query(() => GetFlashes, { name: "getFlashes" })
    gets(
        @Args("searchInput")
        searchInput
    ) {
        return this.flashService.gets(searchInput);
    };

    //Get Running Flashes
    @Query(() => GetFlashes, { name: "getRunningFlashes" })
    getRunning(
        @Args("searchInput")
        searchInput
    ) {
        return this.flashService.getRunning(searchInput);
    };

    //Get Single Flash
    @Query(() => Flash, { name: "getFlash" })
    get(
        @Args("id", { type: () => String })
        id
    ) {
        return this.flashService.get(id);
    };

    //Add Flash sale
    @Mutation(() => SuccessInfo, { name: "addFlash" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    add(
        @Args("flashInput")
        flashInput
    ) {
        return this.flashService.add(flashInput);
    };

    //Update Flash sale
    @Mutation(() => SuccessInfo, { name: "updateFlash" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    update(
        @Args("flashInput")
        flashInput,
        @Args("id", { type: () => String })
        id
    ) {
        return this.flashService.update(flashInput, id);
    };

    //Delete Flash sale
    @Mutation(() => SuccessInfo, { name: "deleteFlash" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    delete(
        @Args("id", { type: () => String })
        id
    ) {
        return this.flashService.delete(id);
    };
}
import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { Settings } from "./entities/setting.entity";

//Guard
import { Roles } from "@/auth/decorator/auth.decorator";
import { Role } from "@/auth/enum/auth.enum";
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";

@Resolver()
export class SettingResolver {
    //Constructor
    constructor(settingService) {
        this.settingService = settingService;
    };

    //Get Site settings
    @Query(() => Settings, { name: "getSiteSettings" })
    get() {
        return this.settingService.get();
    }

    //Save or Add Site setting
    @Mutation(() => SuccessInfo, { name: "addSettings" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    site(
        @Args("siteInput")
        siteInput
    ) {
        return this.settingService.site(siteInput);
    }
}
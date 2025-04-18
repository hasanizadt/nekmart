import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { Banner } from "./entities/banner.entity";
import { Sections } from "./entities/section.entity";
import { SectionProduct } from "./entities/section-product.entity";

//Guard
import { Roles } from "@/auth/decorator/auth.decorator";
import { Role } from "@/auth/enum/auth.enum";
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";

@Resolver(Sections)
export class HomeResolver {
    //Constructor
    constructor(homeService) {
        this.homeService = homeService;
    };

    //----------------------------------------Banner 1(One)-------------------------//

    //Get Banner
    @Query(() => [Banner], { name: "getBannerOne" })
    getOne() {
        return this.homeService.getOne();
    };

    //Add Banner
    @Mutation(() => SuccessInfo, { name: "addBannerOne" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    addOne(
        @Args("bannerInput")
        bannerInput
    ) {
        return this.homeService.addOne(bannerInput);
    };

    //Update Banner
    @Mutation(() => SuccessInfo, { name: "updateBannerOne" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    updateOne(
        @Args("bannerInput")
        bannerInput,
        @Args("id", { type: () => String })
        id
    ) {
        return this.homeService.updateOne(bannerInput, id);
    };

    //Delete Banner
    @Mutation(() => SuccessInfo, { name: "deleteBannerOne" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    deleteOne(
        @Args("id", { type: () => String })
        id
    ) {
        return this.homeService.deleteOne(id);
    };



    //------------------------------Banner 2 (Two)----------------------------------//

    //Get Banner
    @Query(() => [Banner], { name: "getBannerTwo" })
    getTwo() {
        return this.homeService.getTwo();
    };

    //Add Banner
    @Mutation(() => SuccessInfo, { name: "addBannerTwo" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    addTwo(
        @Args("bannerInput")
        bannerInput,
    ) {
        return this.homeService.addTwo(bannerInput);
    };

    //Update Banner
    @Mutation(() => SuccessInfo, { name: "updateBannerTwo" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    updateTwo(
        @Args("bannerInput")
        bannerInput,
        @Args("id", { type: () => String })
        id
    ) {
        return this.homeService.updateTwo(bannerInput, id);
    };

    //Delete Banner
    @Mutation(() => SuccessInfo, { name: "deleteBannerTwo" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    deleteTwo(
        @Args("id", { type: () => String })
        id
    ) {
        return this.homeService.deleteTwo(id);
    };

    //-----------------------------------Section Part-------------------------------//

    //Get sections
    @Query(() => [Sections], { name: "getSections" })
    getSections() {
        return this.homeService.getSections();
    };

    //Get single sections
    @Query(() => Sections, { name: "getSingleSection" })
    getSection(
        @Args("id", { type: () => String })
        id
    ) {
        return this.homeService.getSection(id);
    };

    //Get Sections With Products
    @Query(() => [SectionProduct], { name: "getSectionProducts" })
    getProduct() {
        return this.homeService.getProduct();
    };

    //Add Section
    @Mutation(() => SuccessInfo, { name: "addSection" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    addSection(
        @Args("sectionInput")
        sectionInput
    ) {
        return this.homeService.addSection(sectionInput);
    }

    //Update Section
    @Mutation(() => SuccessInfo, { name: "updateSection" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    updateSection(
        @Args("sectionInput")
        sectionInput,
        @Args("id", { type: () => String })
        id
    ) {
        return this.homeService.updateSection(sectionInput, id);
    };

    //Delete Section
    @Mutation(() => SuccessInfo, { name: "deleteSection" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    deleteSection(
        @Args("id", { type: () => String })
        id
    ) {
        return this.homeService.deleteSection(id);
    };
}
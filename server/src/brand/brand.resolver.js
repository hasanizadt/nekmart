import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { Brand, GetBrands } from "./entities/brand.entity";

//Guards
import { Roles } from "@/auth/decorator/auth.decorator";
import { Role } from "@/auth/enum/auth.enum";
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";

@Resolver()
export class BrandResolver {
    //Constructor
    constructor(brandService) {
        this.brandService = brandService;
    };

    //Get brands
    @Query(() => GetBrands, { name: "getBrands" })
    getBrands(
        @Args("searchInput")
        searchInput
    ) {
        return this.brandService.getBrands(searchInput);
    }

    //Get Single Brand
    @Query(() => Brand, { name: "getBrand" })
    getBrand(
        @Args("id", { type: () => String })
        id
    ) {
        return this.brandService.getBrand(id);
    }

    //Add brand
    @Mutation(() => SuccessInfo, { name: "addBrand" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    add(
        @Args("brandInput")
        brandInput
    ) {
        return this.brandService.add(brandInput);
    }

    //Update brand
    @Mutation(() => SuccessInfo, { name: "updateBrand" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    update(
        @Args("id", { type: () => String })
        id,
        @Args("brandInput")
        brandInput
    ) {
        return this.brandService.update(id, brandInput);
    }


    //Delete Brand
    @Mutation(() => SuccessInfo, { name: "deleteBrand" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    delete(
        @Args("id", { type: () => String })
        id
    ) {
        return this.brandService.delete(id);
    }
}
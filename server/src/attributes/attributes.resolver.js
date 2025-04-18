import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Entities
import { SuccessInfo } from "@/user/entities/success.entity";
import { GetAttributes, Attribute } from "./entities/attribute.entity";

//Guards
import { Roles } from "@/auth/decorator/auth.decorator";
import { Role } from "@/auth/enum/auth.enum";
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";

@Resolver()
export class AttributeResolver {
    //Constructor
    constructor(attributeService) {
        this.attributeService = attributeService;
    };

    //Get attributes
    @Query(() => GetAttributes, { name: "getAttributes" })
    @Roles(Role.SELLER, Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getAttributes(
        @Args("searchInput")
        searchInput
    ) {
        return this.attributeService.getAttributes(searchInput);
    };

    //Get single attributes
    @Query(() => Attribute, { name: "getAttribute" })
    @Roles(Role.SELLER, Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getAttribute(
        @Args("id", { type: () => String })
        id
    ) {
        return this.attributeService.getAttribute(id);
    }

    //Add Attributes
    @Mutation(() => SuccessInfo, { name: "addAttribute" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    add(
        @Args("attributeInput")
        attributeInput
    ) {
        return this.attributeService.add(attributeInput);
    };

    //Update Attributes
    @Mutation(() => SuccessInfo, { name: "updateAttribute" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    update(
        @Args("attributeInput")
        attributeInput,
        @Args("id", { type: () => String })
        id
    ) {
        return this.attributeService.update(attributeInput, id);
    };

    //Delete Attribute
    @Mutation(() => SuccessInfo, { name: "deleteAttribute" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    delete(
        @Args("id", { type: () => String })
        id
    ) {
        return this.attributeService.delete(id);
    }
}
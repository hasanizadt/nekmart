import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Entities
import { SuccessInfo } from "src/user/entities/success.entity";
import { GetPreorder } from "./entities/preorder.entity";

//Guard
import { Roles } from "src/auth/decorator/auth.decorator";
import { Role } from "src/auth/enum/auth.enum";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/auth/roles.guard";

@Resolver()
export class PreorderResolver {
    //Constructor
    constructor(preorderService) {
        this.preorderService = preorderService;
    };

    //Get preorder
    @Query(() => GetPreorder, { name: "getPreorder" })
    @Roles(Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    get(
        @Args("searchInput")
        searchInput
    ) {
        return this.preorderService.get(searchInput);
    }

    //Add Preorder
    @Mutation(() => SuccessInfo, { name: "addPreorder" })
    add(
        @Args("preorderInput")
        preorderInput
    ) {
        return this.preorderService.add(preorderInput);
    }

    //Update preorder Note
    @Mutation(() => SuccessInfo, { name: "updatePreorderNote" })
    @Roles(Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    update(
        @Args("preorderNoteInput")
        preorderNoteInput,
        @Args("id", { type: () => String })
        id
    ) {
        return this.preorderService.update(preorderNoteInput, id);
    }

    //Delete Preorder
    @Mutation(() => SuccessInfo, { name: "deletePreorder" })
    @Roles(Role.EDITOR, Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    delete(
        @Args("id", { type: () => String })
        id
    ) {
        return this.preorderService.delete(id);
    }
}
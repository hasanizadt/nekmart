import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class CheckWishlist {
    @Field(() => Boolean, { nullable: false })
    status;
    @Field(() => String, { nullable: false })
    message;
}
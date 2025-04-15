import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class OrderSuccessInfo {
    @Field(() => Boolean, { nullable: false })
    success;
    @Field(() => String, { nullable: false })
    message;
    @Field(() => String, { nullable: false })
    redirectUri;
}
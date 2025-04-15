import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class RedeemInfo {
    @Field(() => Boolean, { nullable: false })
    success;
    @Field(() => String, { nullable: false })
    code;
    @Field(() => String, { nullable: false })
    message;
}
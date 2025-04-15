import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class SuccessInfo {
    @Field(() => Boolean, { nullable: false })
    success;
    @Field(() => String, { nullable: false })
    message;
}
import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class ApplyInfo {
    @Field(() => Boolean, { nullable: false })
    success;
    @Field(() => String, { nullable: false })
    message;
    @Field(() => String, { nullable: false })
    discount;
}
import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class CouponUser {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => String, { nullable: false })
    code;
    @Field(() => String, { nullable: false })
    discount;
    @Field(() => String, { nullable: false })
    discountUnit;
    @Field(() => String, { nullable: false })
    points;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}
import { ObjectType, Field } from "@nestjs/graphql";

//Orm entity
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class CouponAdmin {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => String, { nullable: false })
    name;
    @Field(() => String, { nullable: false })
    code;
    @Field(() => String, { nullable: false })
    discount;
    @Field(() => String, { nullable: false })
    discountUnit;
    @Field(() => String, { nullable: false })
    minimumPurchase;
    @Field(() => Date, { nullable: false })
    expires;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}

@ObjectType()
export class GetCoupons {
    @Field(() => [CouponAdmin], { nullable: false })
    results;
    @Field(() => Meta, { nullable: false })
    meta;
}
import { ObjectType, Field } from "@nestjs/graphql";

//Entities
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class Shipping {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => String, { nullable: false })
    name;
    @Field(() => String, { nullable: false })
    rateInsideDhaka;
    @Field(() => String, { nullable: false })
    rateOutsideDhaka;
    @Field(() => String, { nullable: false })
    rateInSavar;
    @Field(() => String, { nullable: false })
    estimateDelivery;
    @Field(() => Boolean, { nullable: false })
    active;
    @Field(() => String, { nullable: true })
    description;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}

@ObjectType()
export class GetShippings {
    @Field(() => [Shipping], { nullable: false })
    results;
    @Field(() => Meta, { nullable: false })
    meta;
}
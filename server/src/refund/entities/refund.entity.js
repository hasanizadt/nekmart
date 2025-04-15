import { ObjectType, Field, Float } from "@nestjs/graphql";

//Entities
import { Meta } from "@/user/entities/meta.entity";
import { User } from "@/user/entities/user.entity";
import { Refundable } from "./refundable.entity";

@ObjectType()
export class Refund {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => Refundable, { nullable: true })
    refundableId;
    @Field(() => User, { nullable: true })
    user;
    @Field(() => Float, { nullable: true })
    quantity;
    @Field(() => String, { nullable: false })
    reason;
    @Field(() => String, { nullable: false })
    description;
    @Field(() => String, { nullable: false })
    status;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}

@ObjectType()
export class GetRefund {
    @Field(() => [Refund], { nullable: false })
    results;
    @Field(() => Meta, { nullable: false })
    meta;
}
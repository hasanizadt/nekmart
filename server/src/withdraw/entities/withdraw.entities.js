import { ObjectType, Field, Float } from "@nestjs/graphql";

//Entities
import { Seller } from "@/seller/entities/seller.entity";
import { Meta } from "@/user/entities/meta.entity";
import { User } from "@/user/entities/user.entity";

@ObjectType()
export class Withdraw {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => Seller, { nullable: true })
    seller;
    @Field(() => Float, { nullable: false })
    amount;
    @Field(() => User, { nullable: true })
    releasedBy;
    @Field(() => String, { nullable: false })
    method;
    @Field(() => String, { nullable: false })
    status;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}



@ObjectType()
export class GetWithdraw {
    @Field(() => [Withdraw], { nullable: false })
    results;
    @Field(() => Meta, { nullable: false })
    meta;
}
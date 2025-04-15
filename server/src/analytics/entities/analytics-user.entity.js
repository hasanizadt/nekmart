import { Field, ObjectType, Float } from "@nestjs/graphql";

//Address
import { Address } from "@/address/entities/address.entity";

@ObjectType()
export class UserAnalytics {
    @Field(() => Float, { nullable: true })
    totalCart;
    @Field(() => Float, { nullable: true })
    totalWishlist;
    @Field(() => Float, { nullable: true })
    totalOrder;
    @Field(() => Address, { nullable: true })
    defaultAddress;
}
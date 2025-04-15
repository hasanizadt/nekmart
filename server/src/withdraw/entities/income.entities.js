import { ObjectType, Field, Float } from "@nestjs/graphql";

//Entities
import { Seller } from "@/seller/entities/seller.entity";
import { Meta } from "@/user/entities/meta.entity";
import { Order } from "@/orders/entities/order.entity";

@ObjectType()
export class Income {
    @Field(() => String, { nullable: true })
    id;
    @Field(() => Seller, { nullable: true })
    seller;
    @Field(() => Order, { nullable: true })
    orderId;
    @Field(() => Float, { nullable: true })
    income;
    @Field(() => Boolean, { nullable: true })
    paySuccess;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}

@ObjectType()
export class GetIncomes {
    @Field(() => [Income], { nullable: false })
    results;
    @Field(() => Meta, { nullable: false })
    meta;
}

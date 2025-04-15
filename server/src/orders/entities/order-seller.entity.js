import { ObjectType, Field, Float } from "@nestjs/graphql";

//Entities
import { Seller } from "@/seller/entities/seller.entity";
import { Product } from "@/product/entities/product.entity";
import { Order } from "./order.entity";
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class OrderVariation {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => String, { nullable: false })
    name;
    @Field(() => String, { nullable: false })
    variant;
}

@ObjectType()
export class OrderProduct {
    @Field(() => Product, { nullable: true })
    productId;
    @Field(() => Float, { nullable: false })
    quantity;
    @Field(() => [OrderVariation], { nullable: true })
    variation;
    @Field(() => Float, { nullable: false })
    tax;
    @Field(() => Float, { nullable: false })
    amount;
}


@ObjectType()
export class OrderSeller {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => Seller, { nullable: true })
    sellerId;
    @Field(() => [OrderProduct], { nullable: true })
    products;
    @Field(() => Order, { nullable: true })
    order;
    @Field(() => Float, { nullable: false })
    price;
    @Field(() => String, { nullable: false })
    status;
    @Field(() => String, { nullable: false })
    cancelBy;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}

@ObjectType()
export class GetOrderSeller {
    @Field(() => [OrderSeller], { nullable: false })
    results;
    @Field(() => Meta, { nullable: false })
    meta;
}
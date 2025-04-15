import { ObjectType, Field, Float } from "@nestjs/graphql";

//Entities
import { OrderVariation } from "@/orders/entities/order-seller.entity";
import { Order } from "@/orders/entities/order.entity";
import { Product } from "@/product/entities/product.entity";
import { User } from "@/user/entities/user.entity";
import { Seller } from "@/seller/entities/seller.entity";
import { Address } from "@/address/entities/address.entity";

@ObjectType()
export class Refundable {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => User, { nullable: true })
    user;
    @Field(() => Product, { nullable: true })
    productId;
    @Field(() => Order, { nullable: true })
    order;
    @Field(() => Float, { nullable: true })
    quantity;
    @Field(() => [OrderVariation], { nullable: true })
    variation;
    @Field(() => Seller, { nullable: true })
    seller;
    @Field(() => Address, { nullable: true })
    address;
    @Field(() => Float, { nullable: false })
    couponDiscount;
    @Field(() => Float, { nullable: false })
    amount;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}
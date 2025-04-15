import { ObjectType, Field, Float } from "@nestjs/graphql";

//Entities
import { User } from "@/user/entities/user.entity";
import { Address } from "@/address/entities/address.entity";
import { OrderSeller } from "./order-seller.entity";
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class PaymentInfo {
    @Field(() => String, { nullable: true })
    paymentMethod;
    @Field(() => String, { nullable: true })
    paymentId;
    @Field(() => String, { nullable: true })
    provider;
}

@ObjectType()
export class Order {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => String, { nullable: false })
    orderId;
    @Field(() => [OrderSeller], { nullable: true })
    sellers;
    @Field(() => Float, { nullable: false })
    couponDiscount;
    @Field(() => Float, { nullable: false })
    total;
    @Field(() => Float, { nullable: false })
    subtotal;
    @Field(() => Float, { nullable: false })
    shippingFees;
    @Field(() => Float, { nullable: false })
    shippingCount;
    @Field(() => String, { nullable: false })
    estimateDelivery;
    @Field(() => PaymentInfo, { nullable: true })
    payment;
    @Field(() => Address, { nullable: true })
    shippingAddress;
    @Field(() => Address, { nullable: true })
    billingAddress;
    @Field(() => String, { nullable: true })
    note;
    @Field(() => User, { nullable: true })
    user;
    @Field(() => Boolean, { nullable: false })
    paymentStatus;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}


@ObjectType()
export class GetOrders {
    @Field(() => [Order], { nullable: false })
    results;
    @Field(() => Meta, { nullable: false })
    meta;
}
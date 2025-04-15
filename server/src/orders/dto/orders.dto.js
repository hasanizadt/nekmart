import { InputType, Field, Float } from "@nestjs/graphql";
import { IsString, IsNumber, IsNotEmpty, IsOptional, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";


@InputType()
export class PaymentInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    paymentMethod;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    paymentId;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    provider;
}

@InputType()
export class OrderVariationInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsOptional()
    id;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsOptional()
    name;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsOptional()
    variant;
}

@InputType()
export class OrderProductsInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    productId;

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    quantity;

    @Field(() => [OrderVariationInput], { nullable: true })
    @IsArray()
    @IsOptional()
    @ValidateNested()
    @Type(() => OrderVariationInput)
    variation;

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    tax;

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    amount;
}

@InputType()
export class OrderSellerInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    sellerId;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    shopName;

    @Field(() => [OrderProductsInput], { nullable: false })
    @IsArray()
    @ValidateNested()
    @Type(() => OrderProductsInput)
    products;

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    price;
}

@InputType()
export class OrderInput {
    @Field(() => [OrderSellerInput], { nullable: true })
    @IsArray()
    @ValidateNested()
    @Type(() => OrderSellerInput)
    sellers;

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    couponDiscount;

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    total;

    @Field(() => [String], { nullable: false })
    @IsArray()
    @IsNotEmpty()
    cartId;

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    subtotal;

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    shippingFees;

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    shippingCount;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    estimateDelivery;


    @Field(() => PaymentInput, { nullable: true })
    @IsOptional()
    @ValidateNested()
    @Type(() => PaymentInput)
    payment;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    shippingAddress;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    billingAddress;
}
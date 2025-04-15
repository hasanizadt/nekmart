import { ObjectType, Field, Float } from "@nestjs/graphql";

//Entities
import { Product } from "@/product/entities/product.entity";
import { Seller } from "@/seller/entities/seller.entity";
import { User } from "@/user/entities/user.entity";

@ObjectType()
export class CartVariation {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => String, { nullable: false })
    name;
    @Field(() => String, { nullable: false })
    variant;
}

@ObjectType()
export class Cart {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => Product, { nullable: false })
    productId;
    @Field(() => Seller, { nullable: false })
    seller;
    @Field(() => User, { nullable: false })
    user;
    @Field(() => Float, { nullable: false })
    reserved;
    @Field(() => [CartVariation], { nullable: true })
    attributes;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}
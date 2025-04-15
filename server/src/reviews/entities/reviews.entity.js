import { ObjectType, Field, Float } from "@nestjs/graphql";
import { Meta } from "@/user/entities/meta.entity";

//Entities
import { User } from "@/user/entities/user.entity";
import { Product } from "@/product/entities/product.entity";
import { Seller } from "@/seller/entities/seller.entity";

@ObjectType()
export class Review {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => User, { nullable: true })
    user;
    @Field(() => Seller, { nullable: true })
    seller;
    @Field(() => Product, { nullable: true })
    product;
    @Field(() => [String], { nullable: true })
    image;
    @Field(() => String, { nullable: false })
    comment;
    @Field(() => String, { nullable: true })
    reply;
    @Field(() => Float, { nullable: false })
    rating;
    @Field(() => Boolean, { nullable: false })
    publish;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}

@ObjectType()
export class GetReviews {
    @Field(() => [Review], { nullable: false })
    results;
    @Field(() => Meta, { nullable: false })
    meta;
}
import { ObjectType, Field, Float } from "@nestjs/graphql";

//Entities
import { User } from "@/user/entities/user.entity";
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class Bank {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => String, { nullable: false })
    name;
    @Field(() => String, { nullable: false })
    accNumber;
    @Field(() => String, { nullable: false })
    routing;
    @Field(() => String, { nullable: false })
    bankName;
    @Field(() => String, { nullable: false })
    branch;
}

@ObjectType()
export class Seller {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => String, { nullable: false })
    shopName;
    @Field(() => String, { nullable: false })
    phone;
    @Field(() => String, { nullable: false })
    logo;
    @Field(() => String, { nullable: false })
    banner;
    @Field(() => String, { nullable: false })
    address;
    @Field(() => String, { nullable: true })
    metaTitle;
    @Field(() => String, { nullable: true })
    metaDescription;
    @Field(() => Boolean, { nullable: false })
    is_verified;
    @Field(() => Boolean, { nullable: false })
    is_banned;
    @Field(() => Bank, { nullable: true })
    bank;
    @Field(() => User, { nullable: true })
    user;
    @Field(() => Float, { nullable: false })
    totalReview;
    @Field(() => Float, { nullable: false })
    totalRating;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}

@ObjectType()
export class GetSellers {
    @Field(() => [Seller], { nullable: false })
    results;
    @Field(() => Meta, { nullable: false })
    meta;
}
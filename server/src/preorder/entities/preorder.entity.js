import { ObjectType, Field } from "@nestjs/graphql";

//Meta
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class Preorder {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => String, { nullable: false })
    firstName;
    @Field(() => String, { nullable: false })
    lastName;
    @Field(() => String, { nullable: false })
    phone;
    @Field(() => String, { nullable: false })
    address;
    @Field(() => String, { nullable: false })
    email;
    @Field(() => [String], { nullable: true })
    productImage;
    @Field(() => [String], { nullable: false })
    productUrl;
    @Field(() => String, { nullable: true })
    note;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}

@ObjectType()
export class GetPreorder {
    @Field(() => [Preorder], { nullable: false })
    results;
    @Field(() => Meta, { nullable: false })
    meta;
}
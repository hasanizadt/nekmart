import { ObjectType, Field } from "@nestjs/graphql";

//Entity
import { Meta } from "./meta.entity";

@ObjectType()
export class Provider {
    @Field(() => String, { nullable: true })
    name;
    @Field(() => String, { nullable: true })
    id;
}

@ObjectType()
export class User {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => String, { nullable: true })
    name;
    @Field(() => String, { nullable: false })
    phone;
    @Field(() => String, { nullable: true })
    email;
    @Field(() => String, { nullable: true })
    avatar;
    @Field(() => Provider, { nullable: true })
    provider;
    @Field(() => Boolean, { nullable: false })
    is_verified;
    @Field(() => Boolean, { nullable: false })
    is_banned;
    @Field(() => String, { nullable: false })
    role;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}

@ObjectType()
export class GetUsers {
    @Field(() => [User], { nullable: true })
    results;
    @Field(() => Meta, { nullable: true })
    meta;
}
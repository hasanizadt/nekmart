import { ObjectType, Field } from "@nestjs/graphql";

//entities
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class Values {
    @Field(() => String, { nullable: false })
    value;
    @Field(() => String, { nullable: true })
    meta;
}

@ObjectType()
export class Attribute {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => String, { nullable: false })
    name;
    @Field(() => [Values], { nullable: true })
    values;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}

@ObjectType()
export class GetAttributes {
    @Field(() => [Attribute], { nullable: false })
    results;
    @Field(() => Meta, { nullable: false })
    meta;
}
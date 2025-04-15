import { ObjectType, Field } from "@nestjs/graphql";

//Entity
import { Category } from "./category.entity";
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class MainCategory {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => String, { nullable: false })
    name;
    @Field(() => String, { nullable: true })
    description;
    @Field(() => [Category], { nullable: true })
    category;
    @Field(() => String, { nullable: true })
    image;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}

@ObjectType()
export class GetMainCategories {
    @Field(() => [MainCategory], { nullable: false })
    results;
    @Field(() => Meta, { nullable: false })
    meta;
}
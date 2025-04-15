import { ObjectType, Field } from "@nestjs/graphql";

//Entities
import { MainCategory } from "./main-category.entity";
import { SubCategory } from "./sub-category.entity";
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class Category {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => String, { nullable: false })
    name;
    @Field(() => String, { nullable: true })
    image;
    @Field(() => MainCategory, { nullable: true })
    main_category;
    @Field(() => [SubCategory], { nullable: true })
    sub_category;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}

@ObjectType()
export class GetCategories {
    @Field(() => [Category], { nullable: false })
    results;
    @Field(() => Meta, { nullable: false })
    meta;
}
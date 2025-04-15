import { ObjectType, Field } from "@nestjs/graphql";

//Entities
import { Category } from "./category.entity";
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class SubCategory {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => String, { nullable: false })
    name;
    @Field(() => Category, { nullable: true })
    category;
    @Field(() => String, { nullable: true })
    image;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}

@ObjectType()
export class GetSubCategories {
    @Field(() => [SubCategory], { nullable: false })
    results;
    @Field(() => Meta, { nullable: false })
    meta;
}
import { ObjectType, Field } from "@nestjs/graphql";

//Entities
import { MainCategory } from "@/category/entities/main-category.entity";

@ObjectType()
export class Sections {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => String, { nullable: false })
    name;
    @Field(() => String, { nullable: false })
    description;
    @Field(() => Boolean, { nullable: false })
    publish;
    @Field(() => String, { nullable: false })
    base;
    @Field(() => MainCategory, { nullable: true })
    category;
    @Field(() => Date, { nullable: false })
    createdAt;
    @Field(() => Date, { nullable: false })
    updatedAt;
}
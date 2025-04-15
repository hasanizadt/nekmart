import { ObjectType, Field } from "@nestjs/graphql";

//Meta
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class Tag {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => String, { nullable: false })
    name;
    @Field(() => String, { nullable: true })
    description;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}

@ObjectType()
export class GetTags {
    @Field(() => [Tag], { nullable: false })
    results;
    @Field(() => Meta, { nullable: true })
    meta;
}
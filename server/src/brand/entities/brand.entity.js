import { ObjectType, Field } from "@nestjs/graphql";

//Meta
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class Brand {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => String, { nullable: false })
    name;
    @Field(() => String, { nullable: true })
    description;
    @Field(() => String, { nullable: true })
    image;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}

@ObjectType()
export class GetBrands {
    @Field(() => [Brand], { nullable: false })
    results;
    @Field(() => Meta, { nullable: false })
    meta;
}
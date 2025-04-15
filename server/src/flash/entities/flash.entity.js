import { ObjectType, Field } from "@nestjs/graphql";

//Entities
import { Meta } from "@/user/entities/meta.entity";

@ObjectType()
export class Flash {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => String, { nullable: false })
    title;
    @Field(() => String, { nullable: true })
    image;
    @Field(() => String, { nullable: true })
    thumb;
    @Field(() => Date, { nullable: false })
    start;
    @Field(() => Date, { nullable: false })
    expires;
    @Field(() => String, { nullable: false })
    discount;
    @Field(() => String, { nullable: false })
    discountUnit;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}



@ObjectType()
export class GetFlashes {
    @Field(() => [Flash], { nullable: false })
    results;
    @Field(() => Meta, { nullable: false })
    meta;
}
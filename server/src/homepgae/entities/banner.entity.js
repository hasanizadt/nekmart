import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class Banner {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => String, { nullable: false })
    name;
    @Field(() => String, { nullable: false })
    url;
    @Field(() => String, { nullable: false })
    path;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}
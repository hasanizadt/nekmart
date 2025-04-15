import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class Platform {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => String, { nullable: false })
    charge;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}
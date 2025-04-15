import { ObjectType, Field } from "@nestjs/graphql";

//Entities
import { User } from "@/user/entities/user.entity";

@ObjectType()
export class Address {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => String, { nullable: false })
    name;
    @Field(() => String, { nullable: false })
    phone;
    @Field(() => String, { nullable: true })
    gender;
    @Field(() => String, { nullable: false })
    address;
    @Field(() => String, { nullable: false })
    country;
    @Field(() => String, { nullable: false })
    city;
    @Field(() => String, { nullable: false })
    area;
    @Field(() => String, { nullable: false })
    postal;
    @Field(() => Boolean, { nullable: true })
    default;
    @Field(() => User, { nullable: true })
    user;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}
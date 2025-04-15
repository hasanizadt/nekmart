import { ObjectType, Field } from "@nestjs/graphql";

//Entities
import { User } from "@/user/entities/user.entity";
import { Product } from "@/product/entities/product.entity";

@ObjectType()
export class Wishlist {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => User, { nullable: false })
    user;
    @Field(() => Product, { nullable: false })
    product;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    update_at;
}
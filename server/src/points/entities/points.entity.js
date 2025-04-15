import { ObjectType, Field, Float } from "@nestjs/graphql";

//Entities
import { Order } from "@/orders/entities/order.entity";
import { User } from "@/user/entities/user.entity";

@ObjectType()
export class Points {
    @Field(() => String, { nullable: false })
    id;
    @Field(() => Float, { nullable: false })
    points;
    @Field(() => Order, { nullable: true })
    order;
    @Field(() => User, { nullable: true })
    user;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}
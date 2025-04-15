import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Meta {
    @Field(() => Int, { nullable: true })
    itemCount;
    @Field(() => Int, { nullable: true })
    totalItems;
    @Field(() => Int, { nullable: true })
    itemsPerPage;
    @Field(() => Int, { nullable: true })
    totalPages;
    @Field(() => Int, { nullable: true })
    currentPage;
}
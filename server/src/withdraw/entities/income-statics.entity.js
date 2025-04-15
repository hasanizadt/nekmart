import { ObjectType, Field } from "@nestjs/graphql";

//Entities
import { Income } from "./income.entities";

@ObjectType()
export class IncomeStatics {
    @Field(() => [Income], { nullable: true })
    currentIncomes;
    @Field(() => [Income], { nullable: true })
    upcomingIncomes;
    @Field(() => Date, { nullable: true })
    lastPaymentDate;
}
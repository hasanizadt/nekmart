import { InputType, Field, Float } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

@InputType()
export class RefundInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    refundableId;

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    quantity;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    reason;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    description;
}
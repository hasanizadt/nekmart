import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class ShippingInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    name;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    rateInsideDhaka;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    rateOutsideDhaka;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    rateInSavar;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    estimateDelivery;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    description;
}
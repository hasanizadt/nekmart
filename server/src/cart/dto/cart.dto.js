import { InputType, Field, Float } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

@InputType()
export class CartVariationInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    id;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    name;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    variant;
}

@InputType()
export class CartInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    productId;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    seller;

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    reserved;

    @Field(() => [CartVariationInput], { nullable: true })
    @IsOptional()
    attributes;
}
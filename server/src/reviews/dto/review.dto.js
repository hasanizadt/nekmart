import { InputType, Field, Float } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional } from "class-validator";

@InputType()
export class ReviewInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    product;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    seller;

    @Field(() => [String], { nullable: true })
    @IsArray()
    @IsOptional()
    image;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    comment;

    @Field(() => Float, { nullable: false })
    @IsNumber()
    @IsNotEmpty()
    rating;
}
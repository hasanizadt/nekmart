import { InputType, Field, Float } from "@nestjs/graphql";
import { IsString, IsNumber, IsArray, IsOptional, IsBoolean } from "class-validator";

@InputType()
export class ProductSearchInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    search;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    seller;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    main_Category;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    category;

    @Field(() => [String], { nullable: true })
    @IsArray()
    @IsOptional()
    sub_category;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    brand;

    @Field(() => [Float], { nullable: true })
    @IsArray()
    @IsOptional()
    price;

    @Field(() => Boolean, { nullable: true })
    @IsBoolean()
    @IsOptional()
    visibility;

    @Field(() => Boolean, { nullable: true })
    @IsBoolean()
    @IsOptional()
    approved;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    order;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    sortBy;

    @Field(() => Float, { nullable: true })
    @IsNumber()
    @IsOptional()
    limit;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    page;
}
import { InputType, Field, Int } from "@nestjs/graphql";
import { IsOptional, IsString, IsEnum, IsNumber } from "class-validator";

@InputType()
export class SearchInput {
    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    search;

    @Field(() => String, { nullable: true })
    @IsOptional()
    @IsString()
    @IsEnum(["ASC", "DESC"])
    orderBy;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsNumber()
    limit;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsNumber()
    page;
}
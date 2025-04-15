import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class SubCategoryInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    name;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    category;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    image;
}
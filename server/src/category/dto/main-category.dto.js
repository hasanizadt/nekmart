import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class MainCategoryInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    name;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    image;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    description;
}
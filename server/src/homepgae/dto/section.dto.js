import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";

@InputType()
export class SectionInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    name;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    description;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    base;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    category;

    @Field(() => Boolean, { nullable: false })
    @IsBoolean()
    @IsNotEmpty()
    publish;
}
import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsArray, ValidateNested, IsOptional } from "class-validator";
import { Type } from "class-transformer";

@InputType()
class ValuesInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    value;
    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    meta;
}

@InputType()
export class AttributeInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    name;

    @Field(() => [ValuesInput], { nullable: false })
    @IsArray()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ValuesInput)
    values;
}
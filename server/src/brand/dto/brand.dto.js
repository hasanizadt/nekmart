import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class BrandInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    name;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    description;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    image;
}


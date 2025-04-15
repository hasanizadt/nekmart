import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional, IsArray } from "class-validator";

@InputType()
export class PreorderInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    firstName;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    lastName;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    phone;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    address;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    email;

    @Field(() => [String], { nullable: true })
    @IsArray()
    @IsOptional()
    productImage;

    @Field(() => [String], { nullable: false })
    @IsArray()
    @IsNotEmpty()
    productUrl;
}
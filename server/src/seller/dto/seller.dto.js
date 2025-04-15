import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class SellerInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    shopName;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    phone;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    password;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    logo;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    banner;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    address;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    metaTitle;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    metaDescription;
}
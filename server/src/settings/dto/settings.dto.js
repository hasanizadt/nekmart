import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsOptional, IsArray } from "class-validator";

@InputType()
export class SettingsInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    logo;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    icon;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    siteTitle;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    slogan;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    metaTitle;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    metaDescription;

    @Field(() => [String], { nullable: true })
    @IsArray()
    @IsOptional()
    metaTag;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    siteUrl;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    ogTitle;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    ogDescription;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    ogImage;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    email;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    phone;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    corporateOffice;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    headOffice;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    facebook;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    instagram;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    youtube;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    twitter;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    linkedIn;
}
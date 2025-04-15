import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class Settings {
    @Field(() => String, { nullable: true })
    id;
    @Field(() => String, { nullable: true })
    logo;
    @Field(() => String, { nullable: true })
    icon;
    @Field(() => String, { nullable: true })
    siteTitle;
    @Field(() => String, { nullable: true })
    slogan;
    @Field(() => String, { nullable: true })
    metaTitle;
    @Field(() => String, { nullable: true })
    metaDescription;
    @Field(() => [String], { nullable: true })
    metaTag;
    @Field(() => String, { nullable: true })
    siteUrl;
    @Field(() => String, { nullable: true })
    ogTitle;
    @Field(() => String, { nullable: true })
    ogDescription;
    @Field(() => String, { nullable: true })
    ogImage;
    @Field(() => String, { nullable: true })
    email;
    @Field(() => String, { nullable: true })
    phone;
    @Field(() => String, { nullable: true })
    corporateOffice;
    @Field(() => String, { nullable: true })
    headOffice;
    @Field(() => String, { nullable: true })
    facebook;
    @Field(() => String, { nullable: true })
    instagram;
    @Field(() => String, { nullable: true })
    youtube;
    @Field(() => String, { nullable: true })
    twitter;
    @Field(() => String, { nullable: true })
    linkedIn;
    @Field(() => Date, { nullable: true })
    created_at;
    @Field(() => Date, { nullable: true })
    updated_at;
}
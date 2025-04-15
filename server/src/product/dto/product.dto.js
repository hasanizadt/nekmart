import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsBoolean, IsOptional, IsNotEmpty, IsEnum, IsArray, IsObject, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@InputType()
export class ProductVariantInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    id;

    @Field(() => [String], { nullable: true })
    @IsArray()
    @IsOptional()
    selected;
}

@InputType()
export class ProductAttributeValueInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    variant;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    price;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    quantity;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    image;
}



@InputType()
export class ProductAttributeInput {
    @Field(() => [String], { nullable: true })
    @IsArray()
    @IsOptional()
    attributeIds;

    @Field(() => [ProductVariantInput], { nullable: true })
    @IsArray()
    @IsOptional()
    @ValidateNested()
    @Type(() => ProductVariantInput)
    selectedVariant;

    @Field(() => [ProductAttributeValueInput], { nullable: true })
    @IsArray()
    @IsOptional()
    @ValidateNested()
    @Type(() => ProductAttributeValueInput)
    attributes;
}

@InputType()
export class ProductSpecificationInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    title;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    value;
}

@InputType()
export class ProductMetaInput {
    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    title;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    description;

    @Field(() => [String], { nullable: true })
    @IsArray()
    @IsOptional()
    metaTags;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    image;
}

@InputType()
export class ProductInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    name;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    main_category;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    category;

    @Field(() => [String], { nullable: true })
    @IsArray()
    @IsOptional()
    sub_category;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    brand;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    unit;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    minPurchase;

    @Field(() => [String], { nullable: true })
    @IsArray()
    @IsOptional()
    tag;

    @Field(() => Boolean)
    @IsBoolean()
    @IsNotEmpty()
    refundAble;

    @Field(() => [String], { nullable: false })
    @IsArray()
    @IsNotEmpty()
    images;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    youtubeLink;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    flash;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    price;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    quantity;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    discount;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    @IsEnum(
        ["flat", "percent"],
        { message: "Discount unit will be only 'flat' and 'percent'!" }
    )
    discountUnit;

    @Field(() => ProductAttributeInput, { nullable: true })
    @IsOptional()
    @ValidateNested()
    @Type(() => ProductAttributeInput)
    attributes;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    description;

    @Field(() => [ProductSpecificationInput], { nullable: true })
    @IsArray()
    @IsOptional()
    @ValidateNested()
    @Type(() => ProductSpecificationInput)
    specification;

    @Field(() => Boolean, { nullable: false })
    @IsBoolean()
    @IsNotEmpty()
    visibility;

    @Field(() => ProductMetaInput, { nullable: true })
    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => ProductMetaInput)
    meta;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    estimateDelivery;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    warranty;

    @Field(() => Boolean, { nullable: false })
    @IsBoolean()
    @IsNotEmpty()
    showStock;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    tax;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    @IsEnum(
        ["flat", "percent"],
        { message: "Tax unit can be only 'flat' and 'percent'!" }
    )
    taxUnit;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    disclaimer;
}
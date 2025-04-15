import { ObjectType, Field } from "@nestjs/graphql";

//Entities
import { Meta } from "@/user/entities/meta.entity";
import { Seller } from "@/seller/entities/seller.entity";
import { MainCategory } from "@/category/entities/main-category.entity";
import { Category } from "@/category/entities/category.entity";
import { SubCategory } from "@/category/entities/sub-category.entity";
import { Brand } from "@/brand/entities/brand.entity";
import { Tag } from "@/tag/entities/tag.entity";
import { Flash } from "@/flash/entities/flash.entity";
import { Attribute } from "@/attributes/entities/attribute.entity";

@ObjectType()
class ProductAttributeValues {
    @Field(() => String, { nullable: true })
    variant;
    @Field(() => String, { nullable: true })
    price;
    @Field(() => String, { nullable: true })
    quantity;
    @Field(() => String, { nullable: true })
    image;
}

@ObjectType()
class ProductAttributeVariant {
    @Field(() => String, { nullable: true })
    id;
    @Field(() => [String], { nullable: true })
    selected;
}

@ObjectType()
class ProductAttribute {
    @Field(() => String, { nullable: true })
    id;
    @Field(() => [Attribute], { nullable: true })
    attributeIds;
    @Field(() => [ProductAttributeVariant], { nullable: true })
    selectedVariant;
    @Field(() => [ProductAttributeValues], { nullable: true })
    attributes;
}

@ObjectType()
class ProductSpecification {
    @Field(() => String, { nullable: true })
    title;
    @Field(() => String, { nullable: true })
    value;
}

@ObjectType()
class ProductMeta {
    @Field(() => String, { nullable: true })
    title;
    @Field(() => String, { nullable: true })
    description;
    @Field(() => [String], { nullable: true })
    metaTags;
    @Field(() => String, { nullable: true })
    image;
}


@ObjectType()
export class Product {
    @Field(() => String, { nullable: true })
    id;
    @Field(() => String, { nullable: false })
    name;
    @Field(() => Seller, { nullable: false })
    seller;
    @Field(() => MainCategory, { nullable: false })
    main_category;
    @Field(() => Category, { nullable: true })
    category;
    @Field(() => [SubCategory], { nullable: true })
    sub_category;
    @Field(() => Brand, { nullable: true })
    brand;
    @Field(() => String, { nullable: true })
    unit;
    @Field(() => String, { nullable: true })
    minPurchase;
    @Field(() => [Tag], { nullable: true })
    tag;
    @Field(() => Boolean, { nullable: false })
    refundAble;
    @Field(() => [String], { nullable: false })
    images;
    @Field(() => String, { nullable: true })
    youtubeLink;
    @Field(() => Flash, { nullable: true })
    flash;
    @Field(() => String, { nullable: false })
    price;
    @Field(() => String, { nullable: false })
    quantity;
    @Field(() => String, { nullable: false })
    discount;
    @Field(() => String, { nullable: false })
    discountUnit;
    @Field(() => ProductAttribute, { nullable: true })
    attributes;
    @Field(() => String, { nullable: true })
    description;
    @Field(() => [ProductSpecification], { nullable: true })
    specification;
    @Field(() => Boolean, { nullable: false })
    visibility;
    @Field(() => Boolean, { nullable: false })
    is_approved;
    @Field(() => ProductMeta, { nullable: true })
    meta;
    @Field(() => String, { nullable: true })
    estimateDelivery;
    @Field(() => String, { nullable: true })
    warranty;
    @Field(() => Boolean, { nullable: false })
    showStock;
    @Field(() => String, { nullable: false })
    tax;
    @Field(() => String, { nullable: false })
    taxUnit;
    @Field(() => String, { nullable: false })
    totalPrice;
    @Field(() => String, { nullable: false })
    disclaimer;
    @Field(() => Date, { nullable: false })
    created_at;
    @Field(() => Date, { nullable: false })
    updated_at;
}

@ObjectType()
export class GetProducts {
    @Field(() => [Product], { nullable: false })
    results;
    @Field(() => Meta, { nullable: false })
    meta;
}
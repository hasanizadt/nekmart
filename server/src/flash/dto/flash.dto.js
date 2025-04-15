import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional, IsDate } from "class-validator";

@InputType()
export class FlashInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    title;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    image;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    thumb;


    @Field(() => Date, { nullable: false })
    @IsDate()
    @IsNotEmpty()
    start;

    @Field(() => Date, { nullable: false })
    @IsDate()
    @IsNotEmpty()
    expires;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    discount;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    discountUnit;
}
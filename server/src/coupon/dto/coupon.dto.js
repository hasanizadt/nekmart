import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsDate, IsEnum } from "class-validator";

@InputType()
export class CouponInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    name;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    code;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    discount;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    @IsEnum(
        ["flat", "percent"],
        { message: "Discount unit should be 'flat' and 'percent'!" }
    )
    discountUnit;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    minimumPurchase;

    @Field(() => Date, { nullable: false })
    @IsDate()
    @IsNotEmpty()
    expires;
}
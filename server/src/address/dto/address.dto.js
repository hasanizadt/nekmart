import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class AddressInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    name;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    phone;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    gender;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    address;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    country;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    city;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    area;

    @Field(() => String, { nullable: true })
    @IsString()
    @IsOptional()
    postal;
}
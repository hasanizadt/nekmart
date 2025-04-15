import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsEmail, IsOptional } from "class-validator";

@InputType()
export class SignupInput {
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
    @IsEmail()
    @IsOptional()
    email;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    password;
}
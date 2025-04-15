import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty } from "class-validator";

@InputType()
export class ResetPasswordInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    phone;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    code;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    password;
}

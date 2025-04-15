import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class BankInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    name;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    accNumber;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    routing;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    bankName;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    branch;
}
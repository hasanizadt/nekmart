import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty } from "class-validator";

//Input Types
@InputType()
export class FacebookInput {
    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    userId;

    @Field(() => String, { nullable: false })
    @IsString()
    @IsNotEmpty()
    accessToken;
}
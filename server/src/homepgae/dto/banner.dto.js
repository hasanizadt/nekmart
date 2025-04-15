import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty } from "class-validator";

@InputType()
export class BannerInput {
    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    name;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    url;

    @Field(() => String, { nullable: false })
    @IsNotEmpty()
    @IsString()
    path;
}
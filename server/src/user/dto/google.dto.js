import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class GoogleInput {
    @Field(() => String, { nullable: true })
    code;
    @Field(() => String, { nullable: true })
    idToken;
}
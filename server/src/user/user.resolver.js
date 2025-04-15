import { Resolver, Mutation, Query, Args, Context } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

//Entity
import { SuccessInfo } from "./entities/success.entity";
import { User, GetUsers } from "./entities/user.entity";

//Guard
import { Roles } from "@/auth/decorator/auth.decorator";
import { Role } from "@/auth/enum/auth.enum";
import { AuthGuard } from "@/auth/auth.guard";
import { RolesGuard } from "@/auth/roles.guard";

@Resolver()
export class UserResolver {
    //Constructor
    constructor(userService) {
        this.userService = userService;
    };

    //Get Profile
    @Query(() => User, { name: "getProfile" })
    @UseGuards(AuthGuard)
    getProfile(
        @Context("user")
        reqUser
    ) {
        return this.userService.getProfile(reqUser);
    };

    //Get Users
    @Query(() => GetUsers, { name: "getUsers" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getUsers(
        @Args("searchInput")
        searchInput
    ) {
        return this.userService.getUsers(searchInput);
    };

    //Get Admins
    @Query(() => GetUsers, { name: "getAdmins" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    getAdmins(
        @Args("searchInput")
        searchInput
    ) {
        return this.userService.getAdmins(searchInput);
    };

    //Signup
    @Mutation(() => SuccessInfo, { name: "signup" })
    signup(
        @Args("signupInput")
        signupInput
    ) {
        return this.userService.signup(signupInput);
    };

    //Add admins
    @Mutation(() => SuccessInfo, { name: "addAdmins" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    addAdmin(
        @Args("adminInput")
        adminInput
    ) {
        return this.userService.addAdmin(adminInput);
    };

    //Resend otp
    @Mutation(() => SuccessInfo, { name: "resendOtp" })
    resend(
        @Args("phone", { type: () => String })
        phone
    ) {
        return this.userService.resend(phone);
    }

    //Phone login
    @Mutation(() => SuccessInfo, { name: "phoneLogin" })
    phoneLogin(
        @Args("phone", { type: () => String })
        phone
    ) {
        return this.userService.phoneLogin(phone);
    }

    //Phone verify
    @Mutation(() => SuccessInfo, { name: "verifyPhone" })
    verify(
        @Args("verifyPhoneInput")
        verifyPhoneInput,
        @Context("req")
        req
    ) {
        return this.userService.verify(verifyPhoneInput, req);
    };

    //Login with phone and password
    @Mutation(() => SuccessInfo, { name: "login" })
    login(
        @Args("loginInput")
        loginInput,
        @Context("req")
        req
    ) {
        return this.userService.login(loginInput, req);
    };

    //Login with phone and password for admin
    @Mutation(() => SuccessInfo, { name: "loginAdmin" })
    adminLogin(
        @Args("loginInput")
        loginInput,
        @Context("req")
        req
    ) {
        return this.userService.adminLogin(loginInput, req);
    };

    //Login with phone and password for seller
    @Mutation(() => SuccessInfo, { name: "loginSeller" })
    sellerLogin(
        @Args("loginInput")
        loginInput,
        @Context("req")
        req
    ) {
        return this.userService.sellerLogin(loginInput, req);
    };

    //Login or signup with google service
    @Mutation(() => SuccessInfo, { name: "googleLogin" })
    google(
        @Args("googleInput")
        googleInput,
        @Context("req")
        req
    ) {
        return this.userService.google(googleInput, req);
    };

    //Login or signup with facebook service
    @Mutation(() => SuccessInfo, { name: "facebookLogin" })
    facebook(
        @Args("facebookInput")
        facebookInput,
        @Context("req")
        req
    ) {
        return this.userService.facebook(facebookInput, req);
    };

    //Update Profile
    @Mutation(() => SuccessInfo, { name: "updateProfile" })
    @UseGuards(AuthGuard)
    update(
        @Args("updateUserInput")
        updateUserInput,
        @Context("user")
        reqUser
    ) {
        return this.userService.update(updateUserInput, reqUser);
    };

    //Change Password
    @Mutation(() => SuccessInfo, { name: "changePassword" })
    @UseGuards(AuthGuard)
    changePassword(
        @Args("changePasswordInput")
        changePasswordInput,
        @Context("user")
        reqUser
    ) {
        return this.userService.changePassword(changePasswordInput, reqUser);
    };

    //Forget Password
    @Mutation(() => SuccessInfo, { name: "forgetPassword" })
    forgetPassword(
        @Args("forgetPasswordInput")
        forgetPasswordInput
    ) {
        return this.userService.forgetPassword(forgetPasswordInput);
    };

    //Reset Password
    @Mutation(() => SuccessInfo, { name: "resetPassword" })
    resetPassword(
        @Args("resetPasswordInput")
        resetPasswordInput
    ) {
        return this.userService.resetPassword(resetPasswordInput);
    };

    //Phone Availability
    @Mutation(() => SuccessInfo, { name: "phoneAvailability" })
    @UseGuards(AuthGuard)
    available(
        @Args("phoneInput")
        phoneInput
    ) {
        return this.userService.available(phoneInput);
    };

    //Phone Change
    @Mutation(() => SuccessInfo, { name: "changePhone" })
    @UseGuards(AuthGuard)
    changePhone(
        @Args("phoneInput")
        phoneInput,
        @Context("user")
        reqUser
    ) {
        return this.userService.phoneChange(phoneInput, reqUser);
    };

    //Phone Verify an Change
    @Mutation(() => SuccessInfo, { name: "changePhoneVerify" })
    @UseGuards(AuthGuard)
    changePhoneVerify(
        @Args("verifyPhoneInput")
        verifyPhoneInput,
        @Context("user")
        reqUser
    ) {
        return this.userService.changePhoneVerify(verifyPhoneInput, reqUser);
    };

    //Ban users
    @Mutation(() => SuccessInfo, { name: "banOrUnbannedUser" })
    @Roles(Role.MODERATOR, Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    ban(
        @Args("id", { type: () => String })
        id,
        @Args("status", { type: () => Boolean })
        status
    ) {
        return this.userService.ban(id, status);
    };

    //Remove Admin
    @Mutation(() => SuccessInfo, { name: "removeAdmin" })
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuard, RolesGuard)
    remove(
        @Args("id", { type: () => String })
        id
    ) {
        return this.userService.remove(id);
    };
}
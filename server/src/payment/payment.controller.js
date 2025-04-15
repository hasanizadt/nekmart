import { Controller, Post, Body, Res } from "@nestjs/common";

@Controller("payment")
export class PaymentController {
    //Constructor
    constructor(paymentService) {
        this.paymentService = paymentService;
    };

    @Post("success")
    paymentSuccess(@Body()
    successDto, @Res()
    res) {
        return this.paymentService.success(successDto, res);
    }

    @Post("cancel")
    paymentCancel(@Body()
    cancelDto, @Res()
    res) {
        return this.paymentService.cancel(cancelDto, res);
    }

    @Post("failed")
    paymentFailed(@Body()
    failedDto, @Res()
    res) {
        return this.paymentService.failed(failedDto, res);
    }
}
import { Injectable } from "@nestjs/common";

@Injectable()
export class PaymentService {
    //Constructor
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }

    //Success
    async success(successDto, res) {
        await this.orderRepository.update({
            orderId: successDto.tran_id
        }, {
            paymentStatus: true,
            payment: {
                paymentMethod: "online",
                paymentId: successDto.val_id,
                provider: successDto.card_type
            }
        });
        res.redirect(
            302,
            `http://localhost:3000/order/success/${successDto.tran_id.replace("NEK-", "")}`
        );
    }

    //Cancel
    async cancel(cancelDto, res) {
        res.redirect(
            302,
            `http://localhost:3000/order/cancel/${cancelDto.tran_id.replace("NEK-", "")}`
        );
    }

    //Failed
    async failed(failedDto, res) {
        res.redirect(
            302,
            `http://localhost:3000/order/failed/${failedDto.tran_id.replace("NEK-", "")}`
        );
    }
}
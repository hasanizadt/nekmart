import { Injectable, NotFoundException } from "@nestjs/common";
import { MoreThanOrEqual } from "typeorm";
import { paginate, PaginationTypeEnum } from "nestjs-typeorm-paginate";

@Injectable()
export class RefundService {
    //Constructor
    constructor(refundRepository, refundableRepository) {
        this.refundRepository = refundRepository;
        this.refundableRepository = refundableRepository;
    };

    //Get refundable products
    async refundable(reqUser) {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() - 7);

        const refundable = await this.refundableRepository.find({
            where: {
                user: { id: reqUser.id },
                refundable: true,
                refunded: false,
                updated_at: MoreThanOrEqual(endDate),
            },
            relations: {
                productId: true,
                order: true,
                seller: true
            },
            order: {
                created_at: "DESC"
            }
        });
        return refundable;
    };

    //Get refund by user
    async getByUser(reqUser) {
        const refund = await this.refundRepository.find({
            where: {
                user: { id: reqUser.id }
            },
            relations: {
                refundableId: {
                    productId: true,
                    order: true
                }
            },
            order: {
                created_at: "DESC"
            }
        });
        return refund;
    }

    //Get refund by admin
    async getByAdmin(searchInput) {
        const refunds = await this.refundRepository
            .createQueryBuilder("refund")
            .leftJoinAndSelect("refund.user", "user")
            .leftJoinAndSelect("refund.refundableId", "refundableId")
            .leftJoinAndSelect("refundableId.order", "order")
            .leftJoinAndSelect("refundableId.productId", "productId")
            .leftJoinAndSelect("refundableId.seller", "seller")
            .leftJoinAndSelect("refundableId.address", "address")
            .orderBy("refund.created_at", searchInput.orderBy ?? "DESC")

        if (searchInput.search) {
            refunds.where(
                "LOWER(refund.name) LIKE :search",
                { search: `%${searchInput.search.toLowerCase()}%` }
            )
        }

        const { items, meta } = await paginate(refunds, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    }

    //Add Refund
    async add(refundInput, reqUser) {
        const refund = await this.refundRepository.findOne({
            where: {
                refundableId: { id: refundInput.refundableId },
                user: { id: reqUser.id }
            }
        });
        if (refund) throw new NotFoundException("You already placed request for refund this product!");
        const newRefund = await this.refundRepository.create({
            ...refundInput,
            refundableId: { id: refundInput.refundableId },
            user: { id: reqUser.id }
        })
        await this.refundRepository.save(newRefund);
        await this.refundableRepository.update(refundInput.refundableId, {
            refunded: true
        });
        return {
            success: true,
            message: "Refund request placed successfully!"
        }
    }

    //Change Refund status
    async change(id, refundStatusInput) {
        const refund = await this.refundRepository.findOne({
            where: {
                id: id
            }
        });
        if (!refund) throw new NotFoundException("Refund id not found!");
        if (refund.status === "Approved" || refund.status === "Cancelled") throw new NotFoundException("You can't change status now!");

        await this.refundRepository.update(id, refundStatusInput);

        return {
            success: true,
            message: "Refund status changed successfully!"
        }
    }
}
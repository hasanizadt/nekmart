import { Injectable, NotFoundException } from "@nestjs/common";
import { paginate, PaginationTypeEnum } from "nestjs-typeorm-paginate";

@Injectable()
export class PreorderService {
    //Constructor
    constructor(preorderRepository) {
        this.preorderRepository = preorderRepository;
    };

    //Get Preorder
    async get(searchInput) {
        const preorders = await this.preorderRepository
            .createQueryBuilder("preorder")
            .orderBy("preorder.created_at", searchInput.orderBy ?? "DESC")

        if (searchInput.search) {
            preorders.where(
                "LOWER(preorder.name) LIKE :search",
                { search: `%${searchInput.search.toLowerCase()}%` }
            )
        }

        const { items, meta } = await paginate(preorders, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    };

    //Add preorder
    async add(preorderInput) {
        const preorder = this.preorderRepository.create(preorderInput);
        await this.preorderRepository.save(preorder)
        return {
            success: true,
            message: "Preorder request placed successfully!"
        }
    };

    //Update preorder note
    async update(preorderNoteInput, id) {
        const result = await this.preorderRepository.update(id, { note: preorderNoteInput.note });
        if (result.affected === 0) throw new NotFoundException("Pre-order not found!");
        return {
            success: true,
            message: "Pre-order updated successfully!"
        }
    }

    //Delete Preorder
    async delete(id) {
        const result = await this.preorderRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException("Pre-order not found!");
        return {
            success: true,
            message: "Pre-order deleted successfully!"
        }
    }
}
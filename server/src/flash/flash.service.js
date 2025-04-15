import { Injectable, NotFoundException } from "@nestjs/common";
import { paginate, PaginationTypeEnum } from "nestjs-typeorm-paginate";

@Injectable()
export class FlashService {
    //Constructor
    constructor(flashRepository) {
        this.flashRepository = flashRepository;
    };

    //Get Flashes
    async gets(searchInput) {
        const flashes = await this.flashRepository
            .createQueryBuilder("flash")
            .orderBy("flash.created_at", searchInput.orderBy ?? "DESC")

        if (searchInput.search) {
            flashes.where(
                "LOWER(flash.name) LIKE :search",
                { search: `%${searchInput.search.toLowerCase()}%` }
            )
        }

        const { items, meta } = await paginate(flashes, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    }

    //Get Running Flashes
    async getRunning(searchInput) {
        const flashes = await this.flashRepository
            .createQueryBuilder("flash")
            .orderBy("flash.created_at", searchInput.orderBy ?? "DESC")
            .andWhere("flash.start <= NOW()")
            .andWhere("flash.expires >= NOW()")

        if (searchInput.search) {
            flashes.where(
                "LOWER(flash.name) LIKE :search",
                { search: `%${searchInput.search.toLowerCase()}%` }
            )
        }

        const { items, meta } = await paginate(flashes, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    }

    //Get Single Flash
    async get(id) {
        const flash = await this.flashRepository.findOne({
            where: {
                id
            }
        });
        if (!flash) throw new NotFoundException("Flash not found!");
        return flash;
    }

    //Add Flash
    async add(flashInput) {
        const flash = await this.flashRepository.findOneBy({
            title: flashInput.title
        });
        if (flash) throw new NotFoundException("Flash sale already created!");
        const newFlash = this.flashRepository.create(flashInput);
        await this.flashRepository.save(newFlash);
        return {
            success: true,
            message: "Flash sale createdAt successfully!"
        }
    };

    //Update Flash
    async update(flashInput, id) {
        const flash = await this.flashRepository.findOneBy({
            id
        });
        if (!flash) throw new NotFoundException("Flash sale not found!");
        if (flash.title !== flashInput.title) {
            const hasFlash = await this.flashRepository.findOneBy({
                title: flashInput.title
            });
            if (hasFlash) throw new NotFoundException("Flash sale already listed!");
        }
        await this.flashRepository.update(id, flashInput);
        return {
            success: true,
            message: "Flash sale updated successfully!"
        }
    }

    //Delete Flash sale
    async delete(id) {
        try {
            const result = await this.flashRepository.delete(id);
            if (result.affected === 0) throw new NotFoundException("Flash sale not found!");
        } catch {
            throw new NotFoundException("Cannot delete flash sale because it has related record!");
        }
        return {
            success: true,
            message: "Flash Deleted Successfully!"
        }
    }
}
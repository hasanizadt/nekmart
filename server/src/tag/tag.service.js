import { Injectable, NotFoundException } from "@nestjs/common";
import { paginate, PaginationTypeEnum } from "nestjs-typeorm-paginate";

@Injectable()
export class TagService {
    //Constructor
    constructor(tagRepository) {
        this.tagRepository = tagRepository;
    };

    //Get tags
    async getTags(searchInput) {
        const tags = await this.tagRepository
            .createQueryBuilder("tag")
            .orderBy("tag.created_at", searchInput.orderBy ?? "DESC")

        if (searchInput.search) {
            tags.where(
                "LOWER(tag.name) LIKE :search",
                { search: `%${searchInput.search.toLowerCase()}%` }
            )
        }

        const { items, meta } = await paginate(tags, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    };

    //Get Tag
    async getTag(id) {
        const tag = await this.tagRepository.findOne({
            where: {
                id: id
            }
        });
        if (!tag) throw new NotFoundException("Tag is not found!");
        return tag;
    };

    //Add tag
    async addTag(tagInput) {
        const tag = await this.tagRepository.findOneBy({
            name: tagInput.name
        });
        if (tag) throw new NotFoundException("Tag already created!");
        const newTag = this.tagRepository.create(tagInput);
        await this.tagRepository.save(newTag);
        return {
            success: true,
            message: "Tag created successfully!"
        }
    };

    //Update tag
    async update(id, tagInput) {
        const tag = await this.tagRepository.findOneBy({
            id
        });
        if (!tag) throw new NotFoundException("Tag not found!");
        if (tag.name !== tagInput.name) {
            const hasTag = await this.tagRepository.findOneBy({
                name: tagInput.name
            });
            if (hasTag) throw new NotFoundException("Tag already listed!");
        }
        await this.tagRepository.update(id, tagInput);
        return {
            success: true,
            message: "Tag is updated successfully!"
        }
    };

    //Delete Tag
    async delete(id) {
        try {
            const result = await this.tagRepository.delete(id);
            if (result.affected === 0) throw new NotFoundException("Tag not found!");
        } catch {
            throw new NotFoundException("Cannot delete tag because it has related record!");
        }
        return {
            success: true,
            message: "Brand Deleted Successfully!"
        }
    };
}
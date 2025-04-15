import { Injectable, NotFoundException } from "@nestjs/common";
import { paginate, PaginationTypeEnum } from "nestjs-typeorm-paginate";

@Injectable()
export class AttributeService {
    //Constructor
    constructor(attributeRepository) {
        this.attributeRepository = attributeRepository;
    };

    //Get Attributes
    async getAttributes(searchInput) {
        const attributes = await this.attributeRepository
            .createQueryBuilder("attribute")
            .orderBy("attribute.created_at", searchInput.orderBy ?? "DESC")

        if (searchInput.search) {
            attributes.where(
                "LOWER(attribute.name) LIKE :search",
                { search: `%${searchInput.search.toLowerCase()}%` }
            )
        }

        const { items, meta } = await paginate(attributes, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    };

    //Get single attribute
    async getAttribute(id) {
        const attribute = await this.attributeRepository.findOne({
            where: {
                id
            }
        });
        if (!attribute) throw new NotFoundException("Attribute not found!");
        return attribute;
    }

    //Add Attributes
    async add(attributeInput) {
        const attribute = await this.attributeRepository.findOneBy({
            name: attributeInput.name
        });
        if (attribute) throw new NotFoundException("Attribute already added!");
        const newAttribute = this.attributeRepository.create(attributeInput);
        await this.attributeRepository.save(newAttribute);
        return {
            success: true,
            message: "Attributes added successfully!"
        }
    };

    //Update Attributes
    async update(attributeInput, id) {
        const attribute = await this.attributeRepository.findOneBy({
            id: id
        });
        if (!attribute) throw new NotFoundException("Attribute not found!");
        if (attribute.name !== attributeInput.name) {
            const hasAttribute = await this.attributeRepository.findOneBy({
                name: attributeInput.name
            });
            if (hasAttribute) throw new NotFoundException("Attribute already listed!");
        };
        await this.attributeRepository.update(id, attributeInput);
        return {
            success: true,
            message: "Attribute updated successfully!"
        }
    };

    //Delete Attribute
    async delete(id) {
        try {
            const result = await this.attributeRepository.delete(id);
            if (result.affected === 0) throw new NotFoundException("Attribute not found!");
        } catch {
            throw new NotFoundException("Cannot delete attribute because it has related record!");
        }
        return {
            success: true,
            message: "Brand Deleted Successfully!"
        }
    }
}
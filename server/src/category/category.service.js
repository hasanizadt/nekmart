import { Injectable, NotFoundException } from "@nestjs/common";
import { paginate, PaginationTypeEnum } from "nestjs-typeorm-paginate";

@Injectable()
export class CategoryService {
    //Constructor
    constructor(mainRepository, categoryRepository, subRepository) {
        this.mainRepository = mainRepository;
        this.categoryRepository = categoryRepository;
        this.subRepository = subRepository;
    };

    //-----------------------Main Category -------------------------------------//
    //Get all main category
    async mainCategories(searchInput) {
        const mains = await this.mainRepository
            .createQueryBuilder("main")
            .leftJoinAndSelect("main.category", "category")
            .leftJoinAndSelect("category.sub_category", "sub_category")
            .orderBy("main.created_at", searchInput.orderBy ?? "DESC")

        if (searchInput.search) {
            mains.where(
                "LOWER(main.name) LIKE :search",
                { search: `%${searchInput.search.toLowerCase()}%` }
            )
        }

        const { items, meta } = await paginate(mains, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    };

    //Get single main category
    async mainCategory(id) {
        const main = await this.mainRepository.findOne({
            where: {
                id
            }
        });
        if (!main) throw new NotFoundException("Main category not found!");
        return main;
    };

    //Add main category
    async addMain(mainCategoryInput) {
        const main = await this.mainRepository.findOneBy({
            name: mainCategoryInput.name
        });
        if (main) throw new NotFoundException("Main category already added!");
        const newMain = this.mainRepository.create(mainCategoryInput);
        await this.mainRepository.save(newMain);
        return {
            success: true,
            message: "Main category added successfully!"
        }
    };


    //Update main category
    async updateMain(mainCategoryInput, id) {
        const main = await this.mainRepository.findOneBy({
            id
        });
        if (!main) throw new NotFoundException("Main category not found!");
        if (main.name !== mainCategoryInput.name) {
            const hasMain = await this.mainRepository.findOneBy({
                name: mainCategoryInput.name
            })
            if (hasMain) throw new NotFoundException("Main category name already in use!");
        }
        await this.mainRepository.update(id, mainCategoryInput);
        return {
            success: true,
            message: "Main category updated successfully!"
        }
    };

    //Delete main
    async deleteMain(id) {
        try {
            const result = await this.mainRepository.delete(id);
            if (result.affected === 0) throw new NotFoundException("Main category not found!");
        } catch {
            throw new NotFoundException("Cannot delete main category because it has related record!");
        }
        return {
            success: true,
            message: "Main category deleted successfully!"
        }
    };

    //----------------------------------Category-----------------------------------//
    //Get all sub-category
    async categories(searchInput) {
        const categories = await this.categoryRepository
            .createQueryBuilder("category")
            .leftJoinAndSelect("category.main_category", "main_category")
            .orderBy("category.created_at", searchInput.orderBy ?? "DESC")

        if (searchInput.search) {
            categories.where(
                "LOWER(category.name) LIKE :search",
                { search: `%${searchInput.search.toLowerCase()}%` }
            )
        }

        const { items, meta } = await paginate(categories, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    }

    //Get single category
    async category(id) {
        const category = await this.categoryRepository.findOne({
            where: {
                id
            },
            relations: {
                main_category: true
            }
        });
        if (!category) throw new NotFoundException("Category not found!");
        return category;
    };

    //Add Category
    async addCategory(categoryInput) {
        const category = await this.categoryRepository.findOne({
            where: {
                name: categoryInput.name,
                main_category: { id: categoryInput.main_category }
            }
        });
        if (category) throw new NotFoundException("Category already added!")
        const newCategory = this.categoryRepository.create({
            ...categoryInput,
            main_category: { id: categoryInput.main_category }
        });
        await this.categoryRepository.save(newCategory);
        return {
            success: true,
            message: "Category added successfully!"
        }
    };

    //Update category
    async updateCategory(categoryInput, id) {
        const category = await this.categoryRepository.findOneBy({
            id
        });
        if (!category) throw new NotFoundException("Category not found!");
        if (category.name !== categoryInput.name) {
            const hasCategory = await this.categoryRepository.findOneBy({
                name: categoryInput.name
            });
            if (hasCategory) throw new NotFoundException("Category name already in use!");
        }
        await this.categoryRepository.update(id, {
            ...categoryInput,
            main_category: { id: categoryInput.main_category }
        });
        return {
            success: true,
            message: "Category updated successfully!"
        }
    };

    //Delete category
    async deleteCategory(id) {
        try {
            const result = await this.categoryRepository.delete(id);
            if (result.affected === 0) throw new NotFoundException("Category not found!");
        } catch {
            throw new NotFoundException("Cannot delete category because it has related record!");
        }
        return {
            success: true,
            message: "Category deleted successfully!"
        }
    }

    //------------------------------Sub-category------------------------------//
    //Get all sub category
    async getSubs(searchInput) {
        const subs = await this.subRepository
            .createQueryBuilder("sub")
            .leftJoinAndSelect("sub.category", "category")
            .orderBy("sub.created_at", searchInput.orderBy ?? "DESC")

        if (searchInput.search) {
            subs.where(
                "LOWER(sub.name) LIKE :search",
                { search: `%${searchInput.search.toLowerCase()}%` }
            )
        }

        const { items, meta } = await paginate(subs, {
            page: searchInput.page,
            limit: searchInput.limit,
            paginationType: PaginationTypeEnum.TAKE_AND_SKIP
        });
        return {
            results: items,
            meta
        }
    }

    //Get single sub category
    async getSub(id) {
        const sub = await this.subRepository.findOne({
            where: {
                id
            },
            relations: {
                category: true
            }
        });
        if (!sub) throw new NotFoundException("Sub-category not found!");
        return sub;
    }

    //Add sub category
    async createSub(subCategoryInput) {
        const sub = await this.subRepository.findOne({
            where: {
                name: subCategoryInput.name,
                category: { id: subCategoryInput.category }
            }
        });
        if (sub) throw new NotFoundException("Sub-category already added!");
        const newSub = this.subRepository.create({
            ...subCategoryInput,
            category: { id: subCategoryInput.category }
        });
        await this.subRepository.save(newSub);
        return {
            success: true,
            message: "Sub-category added successfully!"
        }
    }

    //Update sub category
    async updateSub(id, subCategoryInput) {
        const sub = await this.subRepository.findOneBy({
            id
        });
        if (!sub) throw new NotFoundException("Sub-category not found!");
        if (sub.name !== subCategoryInput.name) {
            const hasSub = await this.subRepository.findOneBy({
                name: subCategoryInput.name
            });
            if (hasSub) throw new NotFoundException("Sub-category name already used!");
        }
        await this.subRepository.update(id, {
            ...subCategoryInput,
            category: { id: subCategoryInput.category }
        });
        return {
            success: true,
            message: "Sub-category updated successfully!"
        }
    }

    //Delete sub category
    async deleteSub(id) {
        try {
            const result = await this.subRepository.delete(id);
            if (result.affected === 0) throw new NotFoundException("Sub-category not found!");
        } catch {
            throw new NotFoundException("Cannot delete sub-category because it has related record!");
        }
        return {
            success: true,
            message: "Sub-category deleted successfully!"
        }
    }
}
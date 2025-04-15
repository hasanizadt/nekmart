import {
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
    OneToOne,
    JoinColumn,
    DeleteDateColumn,
} from "typeorm";

//Orm Entity
import { Seller } from "@/seller/model/seller.entity";
import { MainCategory } from "@/category/model/main-category.entity";
import { Category } from "@/category/model/category.entity";
import { SubCategory } from "@/category/model/sub-category.entity";
import { Brand } from "@/brand/model/brand.entity";
import { Tag } from "@/tag/model/tag.entity";
import { Flash } from "@/flash/model/flash.entity";
import { ProductAttribute } from "./attribute.entity";
import { Meta } from "./meta.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn("identity")
    id;

    @Column({ type: "text" })
    name;

    @ManyToOne(() => Seller)
    seller;

    @ManyToOne(() => MainCategory)
    main_category;

    @ManyToOne(() => Category)
    category;

    @ManyToMany(() => SubCategory)
    @JoinTable()
    sub_category;

    @ManyToOne(() => Brand)
    brand;

    @Column({ type: "text", nullable: true })
    unit;

    @Column({ type: "text", nullable: true })
    minPurchase;

    @ManyToMany(() => Tag)
    @JoinTable()
    tag;

    @Column({ type: "boolean" })
    refundAble;

    @Column({ type: "text", array: true })
    images;

    @Column({ type: "text", nullable: true })
    youtubeLink;

    @ManyToOne(() => Flash)
    flash;

    @Column({ type: "text" })
    price;

    @Column({ type: "text" })
    quantity;

    @Column({ type: "text" })
    discount;

    @Column({ type: "text", enum: ["flat", "percent"] })
    discountUnit;

    @ManyToOne(() => ProductAttribute)
    attributes;

    @Column({ type: "text", nullable: true })
    description;

    @Column({ type: "jsonb", nullable: true })
    specification;

    @Column({ type: "boolean" })
    visibility;

    @Column({ type: "boolean", default: false })
    is_approved;

    @Column({ type: "boolean", default: false })
    is_hide;

    @OneToOne(() => Meta)
    @JoinColumn()
    meta;

    @Column({ type: "text", nullable: true })
    estimateDelivery;

    @Column({ type: "text", nullable: true })
    warranty;

    @Column({ type: "boolean", nullable: true })
    showStock;

    @Column({ type: "text" })
    tax;

    @Column({ type: "text", enum: ["flat", "percent"] })
    taxUnit;

    @Column({ type: "text" })
    totalPrice;

    @Column({ type: "text", nullable: true })
    disclaimer;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;

    @DeleteDateColumn({ type: "timestamptz" })
    deleted_at;
}

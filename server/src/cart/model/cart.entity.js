import {
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    Column,
    ManyToOne,
} from "typeorm";

//Schema
import { Product } from "@/product/model/product.entity";
import { Seller } from "@/seller/model/seller.entity";
import { User } from "@/user/model/user.entity";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn("identity")
    id;

    @ManyToOne(() => Product)
    productId;

    @ManyToOne(() => User)
    user;

    @ManyToOne(() => Seller)
    seller;

    @Column({ type: "numeric" })
    reserved;

    @Column({ type: "json", nullable: true })
    attributes;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;
}
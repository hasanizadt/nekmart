import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, Column } from "typeorm";

//Orm Entity
import { User } from "@/user/model/user.entity";
import { Seller } from "@/seller/model/seller.entity";
import { Product } from "@/product/model/product.entity";

@Entity()
export class Review {
    @PrimaryGeneratedColumn("identity")
    id;

    @ManyToOne(() => User)
    user;

    @ManyToOne(() => Seller)
    seller;

    @ManyToOne(() => Product)
    product;

    @Column({ type: "text", array: true })
    image;

    @Column({ type: "text" })
    comment;

    @Column({ type: "text", nullable: true })
    reply;

    @Column({ type: "numeric" })
    rating;

    @Column({ type: "boolean", default: false, nullable: true })
    publish;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;
}
import {
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToOne,
    Column,
} from "typeorm";

//Orm entity
import { Product } from "@/product/model/product.entity";

@Entity()
export class OrderProduct {
    @PrimaryGeneratedColumn("identity")
    id;

    @ManyToOne(() => Product)
    productId;

    @Column({ type: "numeric" })
    quantity;

    @Column({ type: "json", nullable: true })
    variation;

    @Column({ type: "numeric" })
    tax;

    @Column({ type: "numeric" })
    amount;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;
}
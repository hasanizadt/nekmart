import {
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    Column,
    ManyToOne,
} from "typeorm";

//Orm Entity
import { Seller } from "@/seller/model/seller.entity";
import { Order } from "@/orders/model/orders.entity";

@Entity()
export class Income {
    @PrimaryGeneratedColumn("identity")
    id;

    @ManyToOne(() => Seller)
    seller;

    @ManyToOne(() => Order)
    orderId;

    @Column({ type: "numeric" })
    income;

    @Column({ type: "boolean", default: false })
    paySuccess;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;
}
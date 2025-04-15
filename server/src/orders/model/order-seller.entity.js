import {
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToOne,
    Column,
    ManyToMany,
    JoinTable,
} from "typeorm";

//Orm entity
import { Seller } from "@/seller/model/seller.entity";
import { OrderProduct } from "./order-product.entity";
import { Order } from "./orders.entity";

@Entity()
export class OrderSeller {
    @PrimaryGeneratedColumn("identity")
    id;

    @ManyToOne(() => Seller)
    sellerId;

    @ManyToOne(() => Order, order => order.sellers, { cascade: true })
    order;

    @Column({ type: "text" })
    shopName;

    @ManyToMany(() => OrderProduct)
    @JoinTable()
    products;

    @Column({ type: "numeric" })
    price;

    @Column(
        { type: "text", enum: ["Pending", "Confirmed", "Picked up", "On the way", "Delivered", "Cancelled"], default: "Pending" }
    )
    status;

    @Column({ type: "text", enum: ["user", "admin"], nullable: true })
    cancelBy;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;
}
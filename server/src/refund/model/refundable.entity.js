import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, Column } from "typeorm";

//Orm entity
import { Product } from "@/product/model/product.entity";
import { Order } from "@/orders/model/orders.entity";
import { Seller } from "@/seller/model/seller.entity";
import { User } from "@/user/model/user.entity";
import { Address } from "@/address/model/address.entity";

@Entity()
export class Refundable {
    @PrimaryGeneratedColumn("identity")
    id;

    @ManyToOne(() => Product)
    productId;

    @ManyToOne(() => Order, { nullable: true })
    order;

    @Column({ type: "text" })
    orderID;

    @ManyToOne(() => User)
    user;

    @ManyToOne(() => Seller)
    seller;

    @ManyToOne(() => Address)
    address;

    @Column({ type: "numeric" })
    quantity;

    @Column({ type: "json", nullable: true })
    variation;

    @Column({ type: "numeric" })
    couponDiscount;

    @Column({ type: "numeric" })
    amount;

    @Column({ type: "boolean", default: false })
    refundable;

    @Column({ type: "boolean", default: false })
    refunded;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;
}
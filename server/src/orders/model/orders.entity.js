import {
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    Column,
    ManyToOne,
    OneToMany,
} from "typeorm";

//Orm Entity
import { User } from "@/user/model/user.entity";
import { OrderSeller } from "./order-seller.entity";
import { Address } from "@/address/model/address.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn("identity")
    id;

    @Column({ type: "text" })
    orderId;

    @OneToMany(() => OrderSeller, seller => seller.order)
    sellers;

    @Column({ type: "numeric" })
    couponDiscount;

    @Column({ type: "numeric" })
    total;

    @Column({ type: "numeric" })
    subtotal;

    @Column({ type: "numeric" })
    shippingCount;

    @Column({ type: "numeric" })
    shippingFees;

    @Column({ type: "text", nullable: true })
    estimateDelivery;

    @Column({ type: "json", nullable: true })
    payment;

    @ManyToOne(() => Address)
    shippingAddress;

    @ManyToOne(() => Address)
    billingAddress;

    @Column({ type: "text", nullable: true })
    note;

    @ManyToOne(() => User)
    user;

    @Column({ type: "boolean", default: false })
    paymentStatus;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;
}
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToOne,
} from "typeorm";

//Orm entity
import { User } from "@/user/model/user.entity";
import { Order } from "@/orders/model/orders.entity";

@Entity()
export class Points {
    @PrimaryGeneratedColumn("identity")
    id;

    @Column({ type: "numeric" })
    points;

    @ManyToOne(() => User)
    user;

    @ManyToOne(() => Order)
    order;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;
}
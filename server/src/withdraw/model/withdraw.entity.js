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
import { User } from "@/user/model/user.entity";


@Entity()
export class Withdraw {
    @PrimaryGeneratedColumn("identity")
    id;

    @ManyToOne(() => Seller)
    seller;

    @Column({ type: "numeric" })
    amount;

    @ManyToOne(() => User)
    releasedBy;

    @Column({ type: "text" })
    method;

    @Column({ type: "text", enum: ["Processing", "Confirmed"], default: "Processing" })
    status;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;
}


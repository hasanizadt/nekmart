import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, Column } from "typeorm";

//Orm entity
import { Refundable } from "./refundable.entity";
import { User } from "@/user/model/user.entity";

@Entity()
export class Refund {
    @PrimaryGeneratedColumn("identity")
    id;

    @ManyToOne(() => Refundable)
    refundableId;

    @ManyToOne(() => User)
    user;

    @Column({ type: "numeric" })
    quantity;

    @Column({ type: "text" })
    reason;

    @Column({ type: "text" })
    description;

    @Column(
        { type: "text", enum: ["Approved", "Pending", "Cancelled"], default: "Pending" }
    )
    status;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;
}
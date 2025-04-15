import {
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    Column,
    ManyToOne,
} from "typeorm";

//Orm entity
import { User } from "@/user/model/user.entity";

@Entity()
export class Coupon {
    @PrimaryGeneratedColumn("identity")
    id;

    @Column({ type: "text" })
    name;

    @Column({ type: "text" })
    code;

    @Column({ type: "text" })
    discount;

    @Column({ type: "text", enum: ["flat", "percent"] })
    discountUnit;

    @Column({ type: "text" })
    minimumPurchase;

    @Column({ type: "timestamptz", nullable: true })
    expires;

    @ManyToOne(() => User, { nullable: true })
    createdBy;

    @Column({ type: "text", nullable: true })
    points;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;
}
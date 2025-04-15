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
export class UsedCoupon {
    @PrimaryGeneratedColumn("identity")
    id;

    @Column({ type: "text" })
    code;

    @Column({ type: "text" })
    discount;

    @Column({ type: "text" })
    discountUnit;

    @ManyToOne(() => User)
    user;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;
}
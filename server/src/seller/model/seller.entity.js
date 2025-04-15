import {
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    Column,
    OneToOne,
    JoinColumn,
} from "typeorm";

//Orm Entity
import { Bank } from "./bank.entity";
import { User } from "@/user/model/user.entity";

@Entity()
export class Seller {
    @PrimaryGeneratedColumn("identity")
    id;

    @Column({ type: "text" })
    shopName;

    @Column({ type: "text" })
    phone;

    @Column({ type: "text" })
    logo;

    @Column({ type: "text" })
    banner;

    @Column({ type: "text" })
    address;

    @Column({ type: "text", nullable: true })
    metaTitle;

    @Column({ type: "text", nullable: true })
    metaDescription;

    @Column({ type: "boolean", default: false })
    is_verified;

    @Column({ type: "boolean", default: false })
    is_banned;

    @OneToOne(() => Bank, bank => bank.seller, { cascade: true })
    @JoinColumn()
    bank;

    @OneToOne(() => User)
    @JoinColumn()
    user;

    @Column({ type: "numeric", default: 0 })
    totalReview;

    @Column({ type: "numeric", default: 0 })
    totalRating;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;
}
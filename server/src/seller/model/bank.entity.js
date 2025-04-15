import {
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    Column,
    OneToOne,
} from "typeorm";

//Orm entity
import { Seller } from "./seller.entity";

@Entity()
export class Bank {
    @PrimaryGeneratedColumn("identity")
    id;

    @Column({ type: "text" })
    name;

    @Column({ type: "text" })
    accNumber;

    @Column({ type: "text" })
    routing;

    @Column({ type: "text" })
    bankName;

    @Column({ type: "text" })
    branch;

    @OneToOne(() => Seller, seller => seller.bank)
    seller;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;
}
import {
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    DeleteDateColumn,
    Column,
    ManyToOne,
} from "typeorm";

//Orm Entity
import { User } from "@/user/model/user.entity";

@Entity()
export class Address {
    @PrimaryGeneratedColumn("identity")
    id;

    @Column({ type: "text" })
    name;

    @Column({ type: "text" })
    phone;

    @Column({ type: "text", enum: ["male", "female", "other"], nullable: true })
    gender;

    @Column({ type: "text" })
    address;

    @Column({ type: "text" })
    country;

    @Column({ type: "text" })
    city;

    @Column({ type: "text" })
    area;

    @Column({ type: "text", nullable: true })
    postal;

    @Column({ type: "boolean", default: false })
    default;

    @ManyToOne(() => User)
    user;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;

    @DeleteDateColumn({ type: "timestamptz" })
    deleted_at;
}
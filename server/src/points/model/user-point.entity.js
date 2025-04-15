import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";

//Orm Entity
import { User } from "@/user/model/user.entity";

@Entity()
export class UserPoints {
    @PrimaryGeneratedColumn("identity")
    id;

    @Column({ type: "numeric", default: 0 })
    points;

    @OneToOne(() => User)
    @JoinColumn()
    user;
}
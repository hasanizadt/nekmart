import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    UpdateDateColumn,
    CreateDateColumn,
} from "typeorm";

//ORM Entity
import { User } from "./user.entity";

@Entity()
export class Session {
    @PrimaryGeneratedColumn("identity")
    id;

    @Column({ type: "text" })
    cookie;

    @ManyToOne(() => User, (user) => user.session, { cascade: true, onDelete: "CASCADE" })
    user;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;
}
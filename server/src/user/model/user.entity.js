import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    OneToMany,
} from "typeorm";

//Entity
import { Session } from "./session.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("identity")
    id;

    @Column({ type: "text" })
    phone;

    @Column({ type: "text", nullable: true })
    name;

    @Column({ type: "text", nullable: true })
    email;

    @OneToMany(() => Session, (session) => session.user)
    session;

    @Column({ type: "text", nullable: true })
    avatar;

    @Column({ type: "text", select: false, nullable: true })
    password;

    @Column(
        { type: "text", enum: ["user", "seller", "editor", "moderator", "admin"], default: "user" }
    )
    role;

    @Column({ type: "text", nullable: true, select: false })
    otp;

    @Column({ type: "jsonb", nullable: true })
    provider;

    @Column({ type: "boolean", default: false })
    is_verified;

    @Column({ type: "boolean", default: false })
    is_banned;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;
}
import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column } from "typeorm";

@Entity()
export class Preorder {
    @PrimaryGeneratedColumn("identity")
    id;

    @Column({ type: "text" })
    firstName;

    @Column({ type: "text" })
    lastName;

    @Column({ type: "text" })
    phone;

    @Column({ type: "text" })
    address;

    @Column({ type: "text" })
    email;

    @Column({ type: "text", array: true, nullable: true })
    productImage;

    @Column({ type: "text", array: true })
    productUrl;

    @Column({ type: "text", nullable: true })
    note;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;
}
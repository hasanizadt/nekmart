import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column } from "typeorm";

@Entity()
export class Flash {
    @PrimaryGeneratedColumn("identity")
    id;

    @Column({ type: "text" })
    title;

    @Column({ type: "text", nullable: true })
    image;

    @Column({ type: "text", nullable: true })
    thumb;

    @Column({ type: "timestamptz" })
    start;

    @Column({ type: "timestamptz" })
    expires;

    @Column({ type: "text" })
    discount;

    @Column({ type: "text" })
    discountUnit;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;
}
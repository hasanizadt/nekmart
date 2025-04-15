import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column } from "typeorm";

@Entity()
export class Shipping {
    @PrimaryGeneratedColumn("identity")
    id;

    @Column({ type: "text" })
    name;

    @Column({ type: "text" })
    rateInsideDhaka;

    @Column({ type: "text" })
    rateOutsideDhaka;

    @Column({ type: "text" })
    rateInSavar;

    @Column({ type: "text" })
    estimateDelivery;

    @Column({ type: "text", nullable: true })
    description;


    @Column({ type: "boolean", default: false })
    active;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;
}
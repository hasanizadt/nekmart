import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column } from "typeorm";

@Entity()
export class BannerTwo {
    @PrimaryGeneratedColumn("identity")
    id;

    @Column({ type: "text" })
    name;

    @Column({ type: "text" })
    url;

    @Column({ type: "text" })
    path;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;
}
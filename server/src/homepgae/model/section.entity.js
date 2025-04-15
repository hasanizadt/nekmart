import {
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    Column,
    ManyToOne,
} from "typeorm";

//Orm Entity
import { MainCategory } from "@/category/model/main-category.entity";

@Entity()
export class Section {
    @PrimaryGeneratedColumn("identity")
    id;

    @Column({ type: "text" })
    name;

    @Column({ type: "text" })
    description;

    @Column({ type: "text", enum: ["category", "latest", "sale"] })
    base;

    @ManyToOne(() => MainCategory)
    category;

    @Column({ type: "boolean" })
    publish;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;
}
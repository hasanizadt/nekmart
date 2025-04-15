import {
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    Column,
    OneToMany,
} from "typeorm";

//Orm Entity
import { Category } from "./category.entity";

@Entity()
export class MainCategory {
    @PrimaryGeneratedColumn("identity")
    id;

    @Column({ type: "text" })
    name;

    @Column({ type: "text", nullable: true })
    image;

    @Column({ type: "text", nullable: true })
    description;

    @OneToMany(() => Category, category => category.main_category, { cascade: true })
    category;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;
}
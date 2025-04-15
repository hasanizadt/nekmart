import {
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    Column,
    ManyToOne,
    OneToMany,
} from "typeorm";

//Orm entity
import { MainCategory } from "./main-category.entity";
import { SubCategory } from "./sub-category.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn("identity")
    id;

    @Column({ type: "text" })
    name;

    @Column({ type: "text", nullable: true })
    image;

    @ManyToOne(() => MainCategory, main => main.category)
    main_category;

    @OneToMany(() => SubCategory, sub => sub.category, { cascade: true })
    sub_category;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;
}
import {
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToOne,
} from "typeorm";

//Entity
import { User } from "@/user/model/user.entity";
import { Product } from "@/product/model/product.entity";

@Entity()
export class Wishlist {
    @PrimaryGeneratedColumn("identity")
    id;

    @ManyToOne(() => User)
    user;

    @ManyToOne(() => Product)
    product;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;
}
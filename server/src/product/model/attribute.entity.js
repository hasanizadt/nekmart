import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";

//Orm Entities
import { Attribute } from "@/attributes/model/attributes.entity";

@Entity()
export class ProductAttribute {
    @PrimaryGeneratedColumn("identity")
    id;

    @ManyToMany(() => Attribute)
    @JoinTable()
    attributeIds;

    @Column({ type: "jsonb", nullable: true })
    selectedVariant;

    @Column({ type: "jsonb", nullable: true })
    attributes;
}
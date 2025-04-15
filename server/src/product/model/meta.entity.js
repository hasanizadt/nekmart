import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Meta {
    @PrimaryGeneratedColumn("identity")
    id;

    @Column({ type: "text", nullable: true })
    title;

    @Column({ type: "text", nullable: true })
    description;

    @Column({ type: "text", nullable: true, array: true })
    metaTags;

    @Column({ type: "text", nullable: true })
    image;
}
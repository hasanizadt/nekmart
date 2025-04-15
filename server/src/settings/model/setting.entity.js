import { Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, Column } from "typeorm";

@Entity()
export class Settings {
    @PrimaryGeneratedColumn("identity")
    id;

    @Column({ type: "text", nullable: true })
    logo;

    @Column({ type: "text", nullable: true })
    icon;

    @Column({ type: "text", nullable: true })
    siteTitle;

    @Column({ type: "text", nullable: true })
    slogan;

    @Column({ type: "text", nullable: true })
    metaTitle;

    @Column({ type: "text", nullable: true })
    metaDescription;

    @Column({ type: "text", nullable: true, array: true })
    metaTag;

    @Column({ type: "text", nullable: true })
    siteUrl;

    @Column({ type: "text", nullable: true })
    ogTitle;

    @Column({ type: "text", nullable: true })
    ogDescription;

    @Column({ type: "text", nullable: true })
    ogImage;

    @Column({ type: "text", nullable: true })
    email;

    @Column({ type: "text", nullable: true })
    phone;

    @Column({ type: "text", nullable: true })
    corporateOffice;

    @Column({ type: "text", nullable: true })
    headOffice;

    @Column({ type: "text", nullable: true })
    facebook;

    @Column({ type: "text", nullable: true })
    instagram;

    @Column({ type: "text", nullable: true })
    youtube;

    @Column({ type: "text", nullable: true })
    twitter;

    @Column({ type: "text", nullable: true })
    linkedIn;

    @UpdateDateColumn({ type: "timestamptz" })
    updated_at;

    @CreateDateColumn({ type: "timestamptz" })
    created_at;
}
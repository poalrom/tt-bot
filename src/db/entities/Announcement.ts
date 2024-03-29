import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Announcement extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public text: string;

    @Column({ default: false })
    public posted: boolean;
}
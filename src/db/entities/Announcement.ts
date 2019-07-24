import { BaseEntity, Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Announcement extends BaseEntity {
    @PrimaryColumn()
    public id: number;

    @Column()
    public text: string;

    @Column({ default: false })
    public posted: boolean;
}
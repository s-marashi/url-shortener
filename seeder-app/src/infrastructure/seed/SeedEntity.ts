import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SeedEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    seedId: number;

    @Column()
    form: string;

    @Column()
    to: string;

    @Column()
    issuedAt: Date;

    @Column()
    issuedTo: string;
}

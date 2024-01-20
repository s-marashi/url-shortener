import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SeedEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({ unique: true })
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

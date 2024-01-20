import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SeedCounterEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    issuedSeedIdCounter: number;
}

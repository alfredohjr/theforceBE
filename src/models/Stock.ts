import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('stocks')
class Stock {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    deposit_id: string;

    @Column()
    product_id: string;

    @Column()
    value: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
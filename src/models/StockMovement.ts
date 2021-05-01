import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('stocks_movement')
class StockMovement {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @Column()
    document_id: string;

    @Column()
    deposit_id: string;

    @Column()
    product_id: string;


    @Column()
    value: number;

    @Column()
    type: 'in' | 'out';

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
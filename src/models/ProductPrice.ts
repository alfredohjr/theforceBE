import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('products_prices')
class ProductPrice {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @Column()
    product_id: string;
    
    @Column()
    level: string;

    @Column()
    started_at: Date;

    @Column()
    finished_at: Date;

    @Column()
    isoffer: boolean;

    @Column()
    price: number;

    @Column()
    deleted_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default ProductPrice;
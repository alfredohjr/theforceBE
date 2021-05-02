
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('documents_products')
class DocumentProduct {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @Column()
    document_id: string;

    @Column()
    product_id: string;

    @Column()
    value: number;

    @Column()
    amount: number;

    @Column()
    deleted_at: Date;
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default DocumentProduct;
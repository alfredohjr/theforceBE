import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('documents')
class Document {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    key: string;

    @Column()
    user_id: string;

    @Column()
    deposit_id: string;

    @Column()
    entity_id: string;

    @Column()
    type: 'in' | 'out';

    @Column()
    closed_at: Date;

    @Column()
    deleted_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Document;
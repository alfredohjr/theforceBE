import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('tokens')
class Token {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    hash: string;

    @Column()
    isvalid: Boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    
}

export default Token;
import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateDepositLog1619895936468 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'deposits_log',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'deposit_id',
                        type: 'uuid',
                        isNullable: false
                    },
                    {
                        name: 'code',
                        type: 'varchar',
                    },
                    {
                        name: 'message',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    }
                ]
            })
        )

        await queryRunner.createForeignKey(
            'deposits_log',
            new TableForeignKey({
                name: 'userdepositlog',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            }));
        
        await queryRunner.createForeignKey(
            'deposits_log',
            new TableForeignKey({
                name: 'depositdepositlog',
                columnNames: ['deposit_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'deposits',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('deposits_log','depositdepositlog');
        await queryRunner.dropForeignKey('deposits_log','userdepositlog');

        await queryRunner.dropTable('deposits_log');
    }

}

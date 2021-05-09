import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateStockLog1620431945725 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'stocks_log',
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
                        name: 'stock_id',
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
        );

        await queryRunner.createForeignKey(
            'stocks_log',
            new TableForeignKey({
                name: 'userstocklog',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            }));
        
        await queryRunner.createForeignKey(
            'stocks_log',
            new TableForeignKey({
                name: 'stockstocklog',
                columnNames: ['stock_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'stocks',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('stocks_log','stockstocklog');
        await queryRunner.dropForeignKey('stocks_log','userstocklog');

        await queryRunner.dropTable('stocks_log');

    }

}

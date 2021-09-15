import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateProductPrice1620862009892 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'products_prices',
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
                        name: 'product_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'level',
                        type: 'varchar',
                    },
                    {
                        name: 'started_at',
                        type: 'timestamp',
                    },
                    {
                        name: 'finished_at',
                        type: 'timestamp',
                    },
                    {
                        name: 'isoffer',
                        type: 'boolean',
                    },
                    {
                        name: 'price',
                        type: 'float',
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        isNullable: true,
                        default: null
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
            'products_prices',
            new TableForeignKey({
                name: 'userproductprices',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            }));

        await queryRunner.createForeignKey(
            'products_prices',
            new TableForeignKey({
                name: 'productproductprices',
                columnNames: ['product_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'products',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('products_prices','productproductprices');
        await queryRunner.dropForeignKey('products_prices','userproductprices');
        
        await queryRunner.dropTable('products_prices');
    }

}

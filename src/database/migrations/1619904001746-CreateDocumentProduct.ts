import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateDocumentProduct1619904001746 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'documents_products',
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
                        name: 'document_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'product_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'value',
                        type: 'integer',
                        isNullable: false
                    },
                    {
                        name: 'amount',
                        type: 'integer',
                        isNullable: false
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        default: null,
                        isNullable: true,
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
            'documents_products',
            new TableForeignKey({
                name: 'userdocumentproduct',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            }));

        await queryRunner.createForeignKey(
            'documents_products',
            new TableForeignKey({
                name: 'documentdocumentproduct',
                columnNames: ['document_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'documents',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            }));

        await queryRunner.createForeignKey(
            'documents_products',
            new TableForeignKey({
                name: 'productdocumentproduct',
                columnNames: ['product_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'products',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('documents_products','userdocumentproduct');
        await queryRunner.dropForeignKey('documents_products','documentdocumentproduct');
        await queryRunner.dropForeignKey('documents_products','productdocumentproduct');

        await queryRunner.dropTable('documents_products');
    }

}

import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateDocumentLog1619903272403 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'documents_log',
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
            'documents_log',
            new TableForeignKey({
                name: 'userdocumentlog',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            }));
        
        await queryRunner.createForeignKey(
            'documents_log',
            new TableForeignKey({
                name: 'documentdocumentlog',
                columnNames: ['document_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'documents',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('documents_log','userdocumentlog');
        await queryRunner.dropForeignKey('documents_log','documentdocumentlog');

        await queryRunner.dropTable('documents_log');
    }

}

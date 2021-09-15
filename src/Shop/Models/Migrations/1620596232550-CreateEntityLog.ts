import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateEntityLog1620596232550 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'entities_log',
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
                        name: 'entity_id',
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
            'entities_log',
            new TableForeignKey({
                name: 'usersentitylog',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            }));

        await queryRunner.createForeignKey(
            'entities_log',
            new TableForeignKey({
                name: 'entityentitylog',
                columnNames: ['entity_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'entities',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('entities_log','entityentitylog');
        await queryRunner.dropForeignKey('entities_log','usersentitylog');

        await queryRunner.dropTable('entities_log');
    }

}

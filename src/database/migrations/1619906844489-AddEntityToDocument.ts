import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddEntityToDocument1619906844489 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'documents',
            new TableColumn({
                name: 'entity_id',
                type: 'uuid'
            })
        );

        await queryRunner.createForeignKey(
            'documents',
            new TableForeignKey({
                name: 'entitydocument',
                columnNames: ['entity_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'entities',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('documents','entitydocument');
        await queryRunner.dropColumn('documents','entity_id');
    }

}

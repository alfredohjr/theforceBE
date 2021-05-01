import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddDocumentToStockMovement1619563096584 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'stockmovement',
            new TableColumn({
                name: 'document_id',
                type: 'uuid',
                isNullable: false
            })
        )

        await queryRunner.createForeignKey('stockmovement', new TableForeignKey({
            name: 'documentstockmovement',
            columnNames: ['document_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'documents',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('stockmovement','documentstockmovement');
        await queryRunner.dropColumn('stockmovement','document_id');
    }

}

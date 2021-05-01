import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddProductToStockMovement1619562825118 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'stockmovement',
            new TableColumn({
                name: 'product_id',
                type: 'uuid',
                isNullable: false
            })
        )

        await queryRunner.createForeignKey('stockmovement', new TableForeignKey({
            name: 'productstockmovement',
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('stockmovement','productstockmovement');
        await queryRunner.dropColumn('stockmovement','product_id')
    }

}

import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddProductToProductLog1619634038067 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'products_log',
            new TableColumn({
                name: 'product_id',
                type: 'uuid',
                isNullable: false
            }));

        await queryRunner.createForeignKey('products_log', new TableForeignKey({
            name: 'productproductlog',
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('products_log','productproductlog');
        await queryRunner.dropColumn('products_log','product_id');
    }

}

import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddProductToStock1619492189979 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'stocks',
            new TableColumn({
                name: 'product_id',
                type: 'uuid',
                isNullable: false
            })
        )

        await queryRunner.createForeignKey('stocks', new TableForeignKey({
            name: 'stockProduct',
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('stocks','stockProduct');
        await queryRunner.dropColumn('stocks','product_id');
    }

}

import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddDepositToStockMovement1619562811984 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'stockmovement',
            new TableColumn({
                name: 'deposit_id',
                type: 'uuid',
                isNullable: false
            })
        )

        await queryRunner.createForeignKey('stockmovement', new TableForeignKey({
            name: 'depositstockmovement',
            columnNames: ['deposit_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'deposits',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('stockmovement','depositstockmovement');
        await queryRunner.dropColumn('stockmovement','deposit_id');
    }

}

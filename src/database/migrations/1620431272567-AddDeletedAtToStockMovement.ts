import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddDeletedAtToStockMovement1620431272567 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'stockmovement',
            new TableColumn({
                name: 'deleted_at',
                type: 'timestamp',
                isNullable: false,
                default: null
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('stockmovement','deleted_at');
    }

}

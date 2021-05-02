import {MigrationInterface, QueryRunner, TableCheck, TableColumn} from "typeorm";

export class AddDeletedAtToDeposit1619878843803 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'deposits',
            new TableColumn({
                name: 'deleted_at',
                type: 'timestamp',
                default: null,
                isNullable: true
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('deposits','deleted_at');
    }

}

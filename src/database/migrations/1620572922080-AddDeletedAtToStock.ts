import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddDeletedAtToStock1620572922080 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'stocks',
            new TableColumn({
                name: 'deleted_at',
                type: 'timestamp',
                isNullable: true,
                default: null
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('stocks','deleted_at');
    }

}

import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddDeletedAtToProducts1619643452266 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'products',
            new TableColumn({
                name: 'deleted_at',
                type: 'timestamp',
                default: null,
                isNullable: true
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('products','deleted_at');
    }

}

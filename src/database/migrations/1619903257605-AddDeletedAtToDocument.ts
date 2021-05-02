import {Column, MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddDeletedAtToDocument1619903257605 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'documents',
            new TableColumn({
                name: 'deleted_at',
                type: 'timestamp',
                default: null,
                isNullable: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('documents','deleted_at');
    }

}

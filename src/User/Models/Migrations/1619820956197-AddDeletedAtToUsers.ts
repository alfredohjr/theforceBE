import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddDeletedAtToUsers1619820956197 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'deleted_at',
                type: 'timestamp',
                default: null,
                isNullable: true
            }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users','deleted_at');
    }

}

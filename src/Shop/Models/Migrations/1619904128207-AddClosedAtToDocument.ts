import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddClosedAtToDocument1619904128207 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'documents',
            new TableColumn({
                name: 'closed_at',
                type: 'timestamp',
                isNullable: true,
                default: null
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('documents','closed_at');
    }

}

import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddIsMasterToUser1620688647496 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'ismaster',
                type: 'boolean',
                isNullable: true,
                default: false
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users','ismaster');
    }

}

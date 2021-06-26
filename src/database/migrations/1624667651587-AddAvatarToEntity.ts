import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddAvatarToEntity1624667651587 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'entities',
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('entities','avatar');
    }

}

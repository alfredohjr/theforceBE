import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddAvatarToProduct1624667743193 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'products',
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('products','avatar');
    }

}

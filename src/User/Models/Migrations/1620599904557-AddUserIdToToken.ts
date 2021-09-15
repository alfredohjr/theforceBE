import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserIdToToken1620599904557 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'tokens',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
                isNullable: false
            }));

        await queryRunner.createForeignKey(
            'tokens',
            new TableForeignKey({
                name: 'usertoken',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tokens','usertoken');
        await queryRunner.dropColumn('tokens','user_id');
    }

}

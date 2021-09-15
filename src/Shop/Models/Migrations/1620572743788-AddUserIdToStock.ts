import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserIdToStock1620572743788 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'stocks',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
                isNullable: false
            }));

        await queryRunner.createForeignKey(
            'stocks',
            new TableForeignKey({
                name: 'userstock',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('stocks','userstock');
        await queryRunner.dropColumn('stocks','user_id');
    }

}

import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserToStockMovement1619562848035 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'stockmovement',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
                isNullable: false
            })
        )

        await queryRunner.createForeignKey('stockmovement', new TableForeignKey({
            name: 'userstockmovement',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('stockmovement','userstockmovement');
        await queryRunner.dropColumn('stockmovement','user_id');
    }

}

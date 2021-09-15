import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserToProductLog1619633865278 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'products_log',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
                isNullable: false
            }));
            
        await queryRunner.createForeignKey('products_log', new TableForeignKey({
            name: 'userproductlog',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('products_log','userproductlog');
        await queryRunner.dropColumn('products_log','user_id');
    }

}

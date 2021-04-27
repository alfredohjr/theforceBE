import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserToProducts1619486752830 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'products',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
                isNullable: false
            })
        )

        await queryRunner.createForeignKey('products', new TableForeignKey({
            name: 'productsUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('products','productsUser');
        await queryRunner.dropColumn('products','user_id');
    }

}

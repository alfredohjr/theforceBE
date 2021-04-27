import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserToDeposits1619490701631 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'deposits',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
                isNullable: false
            })
        )

        await queryRunner.createForeignKey('deposits', new TableForeignKey({
            name: 'depositsUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('deposits','depositsUser');
        await queryRunner.dropColumn('deposits','user_id');
    }

}

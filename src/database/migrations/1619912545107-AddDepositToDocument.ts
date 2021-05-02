import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddDepositToDocument1619912545107 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'documents',
            new TableColumn({
                name: 'deposit_id',
                type: 'uuid',
            }))
        
        await queryRunner.createForeignKey(
            'documents',
            new TableForeignKey({
                name: 'depositdocument',
                columnNames: ['deposit_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'deposits',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('documents','depositdocument');
        await queryRunner.dropColumn('documents','deposit_id');
    }

}

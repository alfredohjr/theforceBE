import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddDepositToStock1619492144755 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'stocks',
            new TableColumn({
                name: 'deposit_id',
                type: 'uuid',
                isNullable: false
            })
        )

        await queryRunner.createForeignKey('stocks', new TableForeignKey({
            name: 'stockDeposit',
            columnNames: ['deposit_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'deposits',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('stocks','stocksDeposit');
        await queryRunner.dropColumn('stocks','deposit_id');
    }

}

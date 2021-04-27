import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserToDocuments1619491639281 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'documents',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
                isNullable: false
            })
        )

        await queryRunner.createForeignKey('documents', new TableForeignKey({
            name: 'documentsUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('documents','documentsUser');
        await queryRunner.dropColumn('documents','user_id');
    }

}

import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddTypeToDocument1619911249033 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'documents',
            new TableColumn({
                name: 'type',
                type: 'varchar'
            })    
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('documents','type');
    }

}

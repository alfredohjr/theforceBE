import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateUserPermissions1620684266939 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users_permissions',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'permission_id',
                        type: 'uuid',
                    },
                    {
                        name: 'active',
                        type: 'boolean',
                    },
                    {
                        name: 'enabled',
                        type: 'boolean',
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        isNullable: true,
                        default: null
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            'users_permissions',
            new TableForeignKey({
                name: 'usersuserspermissions',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            }));

        await queryRunner.createForeignKey(
            'users_permissions',
            new TableForeignKey({
                name: 'permissionsuserspermissions',
                columnNames: ['permission_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'permissions',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            }));


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users_permissions','usersuserspermissions');
        await queryRunner.dropForeignKey('users_permissions','permissionsuserspermissions');

        await queryRunner.dropTable('users_permissions');
    }

}

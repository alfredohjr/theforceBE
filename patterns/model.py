
def Model():

    text = '''// TODO:empty\n'''
    text += '''import {{ Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn }} from "typeorm";\n'''
    text += '''\n'''
    text += '''@Entity('{MODELLOWER}')\n'''
    text += '''class {MODEL} {{\n\n'''
    text += '''    @PrimaryGeneratedColumn('uuid')\n'''
    text += '''    id: string;\n'''
    text += '''\n\n\n'''
    text += '''    @Column()\n'''
    text += '''    deleted_at: Date;\n'''
    text += '''\n'''
    text += '''    @CreateDateColumn()\n'''
    text += '''    created_at: Date;\n'''
    text += '''\n'''
    text += '''    @UpdateDateColumn()\n'''
    text += '''    updated_at: Date;\n'''
    text += '''\n'''
    text += '''}}\n'''
    text += '''\n'''
    text += '''export default {MODEL};\n'''

    return text
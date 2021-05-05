
def Services():

    text = '''// TODO:empty\n'''
    text += '''import {{ getRepository }} from 'typeorm';\n'''
    text += '''import {MODEL} from '{MODEL}.ts';\n\n'''
    text += '''interface Request{{\n'''
    text += '''    id: string;\n'''
    text += '''}};\n\n'''
    text += '''class {TYPE}{MODEL}Service {{\n'''
    text += '''    public async execute({{id}}:Request): Promise<void>{{\n'''
    text += '''        const {MODELLOWER}Repository = getRepository({MODEL});\n'''
    text += '''\n'''
    text += '''    }}\n'''
    text += '''}}\n'''
    text += '''export default {TYPE}{MODEL}Service;\n'''

    return text
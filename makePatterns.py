import sys
import os

from patterns.model import Model
from patterns.service import Services
from patterns.test import Test
from patterns.router import Router
from patterns.check import Check

if __name__ == '__main__':

    path = 'tmp'
    folders = ['services','routes','models','__tests__']

    if not os.path.isdir(path):
        os.mkdir(path)

    for f in folders:
        if not os.path.isdir(path + '/' + f):
            os.mkdir(path + '/' + f)

    # model = sys.argv[1].split(',')
    model = []
    for m in os.listdir('src/models/'):
        m = m.split('.')[0]
        model.append(m)

    print(model)

    print('Create Services Create, Update, Delete and IsValid')

    types = ['Create','Update','Delete','IsValid','Get']

    for m in model:

        print('Create Services',m)
        for t in types:
            fCreate = open('{PATH}/services/{TYPE}{MODEL}Service.ts'.format(MODEL=m,TYPE=t,PATH=path),'w')
            fCreate.write(Services().format(MODEL=m,MODELLOWER=m.lower(),TYPE=t))
            fCreate.close()
        
        print('Create Model',m)
        fCreate = open('{PATH}/models/{MODEL}.ts'.format(PATH=path,MODEL=m),'w')
        fCreate.write(Model().format(MODEL=m,MODELLOWER=m.lower()))
        fCreate.close()

        print('Create __tests__',m)
        fCreate = open('{PATH}/__tests__/{MODELLOWER}.router.spec.ts'.format(PATH=path,MODELLOWER=m.lower()),'w')
        fCreate.write(Test())
        fCreate.close()

        print('Create routes',m)
        fCreate = open('{PATH}/routes/{MODELLOWER}.router.ts'.format(PATH=path,MODELLOWER=m.lower()),'w')
        fCreate.write(Router().format(MODELLOWER=m.lower()))
        fCreate.close()
    
    Check()
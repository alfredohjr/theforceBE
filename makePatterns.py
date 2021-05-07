import sys
import os

from patterns.model import Model
from patterns.service import Service
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

    cs = Service()

    for m in model:
        cs.execute(model=m)
    
    Check()
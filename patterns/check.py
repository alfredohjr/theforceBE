import os
import shutil

def Check():

    tmp = 'tmp'
    tmpFolders = ['__tests__','models','routes','services']
    src = 'src'
    srcFolders = ['__tests__','models','routes','Service']

    for i in range(len(tmpFolders)):
        fromFolder = tmp + '/' + tmpFolders[i]
        toFolder = src + '/' + srcFolders[i]

        ltf = []
        for tf in os.listdir(toFolder):
            ltf.append(tf.lower())

        for ff in os.listdir(fromFolder):
            if ff.lower() not in ltf:
                shutil.move(fromFolder + '/' + ff, toFolder + '/' + ff)

class Service:

    def __init__(self):
        self.create = self.getModel('create')
        self.delete = self.getModel('delete')
        self.isvalid = self.getModel('isvalid')
        self.update = self.getModel('update')
        self.get = self.getModel('get')
        self.tmpPath = 'tmp'

    def readModel(self,fullFilePath=None):
        f = open(fullFilePath,'r')
        f1 = f.readlines()
        f.close()
        return ''.join(f1)

    def getModel(self,typeModel):
        return self.readModel('patterns/service.model/' + typeModel + '.model')
    
    def write2file(self,fileName,text):
        f = open(self.tmpPath + '/' + fileName,'w')
        f.write(text)
        f.close()

    def execute(self,model=None):
        text = self.create.format(MODEL=model,MODELLOWER=model.lower(),TYPE='Create')
        self.write2file('services/Create' + model + 'Service.ts',text)

        text = self.delete.format(MODEL=model,MODELLOWER=model.lower(),TYPE='Delete')
        self.write2file('services/Delete' + model + 'Service.ts',text)

        text = self.isvalid.format(MODEL=model,MODELLOWER=model.lower(),TYPE='IsValid')
        self.write2file('services/IsValid' + model + 'Service.ts',text)

        text = self.update.format(MODEL=model,MODELLOWER=model.lower(),TYPE='Update')
        self.write2file('services/Update' + model + 'Service.ts',text)

        text = self.get.format(MODEL=model,MODELLOWER=model.lower(),TYPE='Get')
        self.write2file('services/Get' + model + 'Service.ts',text)
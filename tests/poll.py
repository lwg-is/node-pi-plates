import importlib
import time

plates = ['DAQCplate', 'DAQC2plate', 'RELAYplate', 'RELAYplate2', 'MOTORplate',
          'THERMOplate', 'TINKERplate', 'DIGIplate',
          'CURRENTplate', 'ADCplate']

for plate in plates:
    PP = importlib.import_module('piplates.' + plate)
    time.sleep(1)
    for i in range(8):
        response = int(PP.getADDR(i))
        if (plate == 'DAQCplate'):
            if (response - 8 == i):
                print(plate, response - 8)
        else:
            if (response == i):
                print(plate, response)
        

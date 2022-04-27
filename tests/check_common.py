#!/usr/bin/env python3

import sys
import time

if (len(sys.argv) != 3):
    print("usage: ./check_common.py <Plate Type> <Plate ID>")
    sys.exit(0)

plate_type = sys.argv[1]
plate_id = int(sys.argv[2])

if (plate_type == "DAQC"):
    import piplates.DAQCplate as PP
elif (plate_type == "DAQC2"):
    import piplates.DAQC2plate as PP
elif (plate_type == "MOTOR"):
    import piplates.MOTORplate as PP
elif (plate_type == "THERMO"):
    import piplates.THERMOplate as PP
elif (plate_type == "RELAY"):
    import piplates.RELAYplate as PP
elif (plate_type == "RELAY2"):
    import piplates.RELAYplate2 as PP
elif (plate_type == "DIGI"):
    import piplates.DIGIplate as PP
elif (plate_type == "ADC"):
    import piplates.ADCplate as PP
elif (plate_type == "CURRENT"):
    import piplates.CURRENTplate as PP

print(plate_type, plate_id)
print("getID(): ", PP.getID(plate_id))
print("getFWrev(): ", PP.getFWrev(plate_id))
print("getHWrev(): ", PP.getHWrev(plate_id))
print("getVersion(): ", PP.getVersion())
print("getADDR(): ", PP.getADDR(plate_id))

if (plate_type == "DAQC"):
    print("setLED(): red ")
    PP.setLED(plate_id, 0)
    time.sleep(2)
    print("setLED(): green ")
    PP.setLED(plate_id, 1)
    time.sleep(2)
    print("clrLED(): red ")
    PP.clrLED(plate_id, 0)
    time.sleep(2)
    print("clrLED(): green ")
    PP.clrLED(plate_id, 1)
    time.sleep(2)
    print("toggleLED(): red ")
    PP.toggleLED(plate_id, 0)
    time.sleep(2)
    print("toggleLED(): green ")
    PP.toggleLED(plate_id, 1)
    time.sleep(2)

elif (plate_type == "DAQC2"):
    LEDcolors=['off','red','green','yellow','blue','magenta','cyan','white']
    for i in LEDcolors:
        print("setLED(): ", i)
        PP.setLED(plate_id, i)
        time.sleep(1)
    print("no DAQC2 clrLED(), substituting setLED(off)")
    PP.setLED(plate_id, "off")
    time.sleep(2)

else:
    print("setLED(): ")
    PP.setLED(plate_id)
    time.sleep(2)
    print("clrLED(): ")
    PP.clrLED(plate_id)
    time.sleep(2)
    print("toggleLED(): ")
    PP.toggleLED(plate_id)
    time.sleep(2)

if plate_type in ["ADC", "DAQC2", "THERMO"]:
    print("getLED(): ", PP.getLED(plate_id))

if (plate_type == "DAQC"):
    print("getLED() bi-color 'red': ", PP.getLED(plate_id, 0))
    print("getLED() bi-color 'green': ", PP.getLED(plate_id, 1))

if (plate_type != "DAQC"):
    time.sleep(2)
    print("RESET() ...")
    PP.RESET(plate_id)

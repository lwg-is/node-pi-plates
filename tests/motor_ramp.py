import time
import piplates.MOTORplate as MOTOR
MOTOR.dcCONFIG(3, 1, 'ccw', 0.0, 0.0)

MOTOR.dcSTART(3, 1)

for i in range(0, 100, 10):
    print("setting speed to: ", i)
    MOTOR.dcSPEED(3, 1, float(i))
    time.sleep(5)

MOTOR.dcSTOP(3, 1)

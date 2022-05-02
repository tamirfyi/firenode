'''
Source: https://pyserial.readthedocs.io/en/latest/shortintro.html
'''
import requests
import serial
from datetime import datetime

url = 'http://localhost:3010/reading'

ser = serial.Serial('/dev/tty.usbmodem1461203', 115200)
ser.flushInput()

# Testing displaying data from serial connection
while True:
    try:
        now = datetime.now()
        timeString = now.strftime(("%Y/%m/%d %H:%M:%S"))
        ser_bytes = ser.readline()
        data = ser_bytes.decode("utf-8")
        if data[0] == 'S':
            list_of_data = data[13:len(data)-1].split(",")
            readingObj = {
                'sensorId': 3,
                'readTime': timeString,
                'co': 0.00,
                'temp': float(list_of_data[0]),
                'humid': float(list_of_data[1])
            }
            # print(readingObj)
            x = requests.post(url, json=readingObj)
            print(x)
        # print(data)
    except:
        print("Keyboard Interrupt")
        break



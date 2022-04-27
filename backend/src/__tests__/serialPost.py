import requests
from datetime import datetime

now = datetime.now()
timeString = now.strftime(("%Y/%m/%d %H:%M:%S"))

url = 'http://localhost:3010/reading'
readingObj = {
  'sensorId': 3,
  'readTime': timeString,
  'co': 999.99,
  'temp': 999.99,
  'humid': 999.99,
}

x = requests.post(url, json=readingObj)
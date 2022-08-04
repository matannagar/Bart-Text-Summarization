import requests

# https://your-heroku-app-name.herokuapp.com/predict
# http://127.0.0.1:5000
resp = requests.post("http://localhost:5000/api/summarize",
                     data={'text': 'HELLO FROM THE OTHER SIDE!'})

print(resp.text)

"""
this function is responsible for creating a database from excel file (dictionary)
"""
import pandas as pd
import re
import json

# turn dictionary excel into python dictionary
dictionary = pd.read_excel('fi_dictionary.xls', index_col=0).to_dict()

# iterate over keys and remove special keys
dictionary2 = {}
for key in dictionary['Description']:
    new_key = re.sub('[^a-zA-Z0-9 \n\.]', ' ', key).lower()
    dictionary2[new_key] = dictionary['Description'][key]

with open("dictionary.json", "w") as outfile:
    json.dump(dictionary2, outfile)
# print keys
# for key in dictionary2:
#     print(key)

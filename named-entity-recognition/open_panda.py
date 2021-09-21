import pandas as pd
import re

# turn dictionary excel into python dictionary
dictionary = pd.read_excel('fi_dictionary.xls', index_col=0).to_dict()

# iterate over keys and remove special keys
dictionary2 = {}
for key in dictionary['Description']:
    new_key = re.sub('[^a-zA-Z0-9 \n\.]', ' ', key).lower()
    dictionary2[new_key] = dictionary['Description'][key]

print(dictionary2)

# print(dictionary['Description']['Abstract_of_title'])

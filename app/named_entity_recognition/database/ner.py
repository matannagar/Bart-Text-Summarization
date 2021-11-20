"""
This class helps generate a python dictionary out of an excel file.
the function scans the given summarization while looking for entities
that are mentioned in the dictionary.
If such are found, they will be added to a list along with the term's explanation
"""
import pandas as pd
from nltk.tokenize import word_tokenize


def named_entity_recognition(summary):

    # reads excel file and translate into python dictionary
    dictionary = pd.read_excel(
        'fi_dictionary.xls', index_col=0).to_dict()
    dictionary = dictionary['Description']
    # lower case the keys
    dictionary = dict((k.lower(), v) for k, v in dictionary .items())
    # tokenize words from summary
    tokenized_summary = word_tokenize(summary)

    # record found entities
    entities = {}

    for token in tokenized_summary:
        if token.lower() in dictionary:
            entities[token.lower()] = dictionary[token.lower()]

    return entities


if __name__ == '__main__':
    summary = 'Abstract_of_title is blah blah and there shell be amortization amorization'
    print(named_entity_recognition(summary))

# TODO remove special characters from entities in dictionary such as _,(,),-...
# more efficient code

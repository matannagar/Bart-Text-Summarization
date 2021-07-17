from tkinter import filedialog
from tkinter import *

import docx2txt


def choose_file():
    # TODO add extensions
    text_file_extensions = ['*.txt', '*.txT', '*.tXT', '*.Txt', '*.TXt', '*.TXT', '*.tXt', '*.docx']
    ftypes = [
        ('test files', text_file_extensions),
        ('All files', '*'),
    ]

    # root = Tk()
    filename = filedialog.askopenfilename(initialdir="/", title="Select file", filetypes=ftypes)
    if filename[-4:] == "docx":
        text = docx2txt.process(filename)
    else:
        try:
            with open(filename, 'r') as file:
                text = file.read()
        except EnvironmentError:
            print('oops')
            text = ""

    return text

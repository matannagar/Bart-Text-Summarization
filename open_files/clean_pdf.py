import os

from tika import parser  # pip install tika


def open_pdf(filepath):
    raw = parser.from_file(filepath)
    text = raw['content']
    text = os.linesep.join([s for s in text.splitlines() if s])
    return text

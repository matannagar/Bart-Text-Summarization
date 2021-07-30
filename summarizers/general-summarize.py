from transformers import pipeline
import docx2txt
from open_files.clean_html import open_html
from open_files.clean_pdf import open_pdf
from open_files.clean_text import clean_text


def summarize(filename):
    summarizer = pipeline('summarization')
    if filename[-4:] == "docx":
        text = docx2txt.process(filename)
    elif filename[-4:] == "html":
        text = open_html(filename)
    elif filename[-3:] == "pdf":
        text = open_pdf(filename)
    else:
        with open(filename, 'r') as file:
            text = file.read()

    text = clean_text(text)
    summary = summarizer(text, max_length=500, min_length=30, do_sample=False, truncation=True)
    print(summary)

    return summary

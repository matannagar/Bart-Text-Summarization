import docx2txt
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from open_files.clean_html import open_html
from open_files.clean_pdf import open_pdf
from open_files.clean_text import clean_text
import re


def summary_by_percentage(text, percentage, max_words):
    res = len(re.findall(r'\w+', text))
    res = res * percentage * (1 / 100)
    if res > max_words:
        return max_words
    return res


def summarize(filename, num_beam=2, min_words=50, max_words=100, percentage=50):
    tokenizer = AutoTokenizer.from_pretrained('../t5-base')
    model = AutoModelForSeq2SeqLM.from_pretrained('../t5-base', return_dict=True)

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
    inputs = tokenizer.encode("summarize: " + text, return_tensors='pt', max_length=512, truncation=True)
    max_words = summary_by_percentage(text, percentage, max_words)

    outputs = model.generate(inputs, max_length=500, min_length=50, length_penalty=5., num_beams=2)
    summary = tokenizer.decode(outputs[0])
    summary = summary[5:-4]

    # if we want an output file
    # with open("Output.txt", "w") as text_file:
    #     text_file.write("Summary: " % summary)

    return summary


if __name__ == "__main__":
    print(summarize("test.txt"))

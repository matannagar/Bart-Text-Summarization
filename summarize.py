import docx2txt
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import re
from clean_html import open_html
from read_pdf import open_pdf


def word_count(text, percentage, max_words):
    res = len(re.findall(r'\w+', text))
    res = res * percentage * (1 / 100)
    if res > max_words:
        return max_words
    return res


def summarize(filename, num_beam=4, min_words=50, max_words=100, percentage=50):
    tokenizer = AutoTokenizer.from_pretrained('./t5-base')
    model = AutoModelForSeq2SeqLM.from_pretrained('./t5-base', return_dict=True)

    if filename[-4:] == "docx":
        text = docx2txt.process(filename)
    elif filename[-4:] == "html":
        text = open_html(filename)
    elif filename[-3] == "pdf":
        text = open_pdf(filename)
    else:
        with open(filename, 'r') as file:
            text = file.read()

    inputs = tokenizer.encode("summarize: " + text, return_tensors='pt', truncation=True)
    max_words = word_count(inputs, percentage, max_words)

    outputs = model.generate(inputs, max_length=max_words, min_length=min_words, length_penalty=5., num_beams=num_beam)
    summary = tokenizer.decode(outputs[0])
    summary = summary[5:-4]

    # if we want an output file
    # with open("Output.txt", "w") as text_file:
    #     text_file.write("Summary: " % summary)

    return summary

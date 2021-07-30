import docx2txt
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import re
from open_files.clean_html import open_html
from open_files.clean_pdf import open_pdf
from open_files.clean_text import clean_text


def word_count(text, percentage, max_words):
    res = len(re.findall(r'\w+', text))
    res = res * percentage * (1 / 100)
    if res > max_words:
        return max_words
    return res


def summarize(filename,percentage):
    tokenizer = AutoTokenizer.from_pretrained('./t5-base')
    model = AutoModelForSeq2SeqLM.from_pretrained('./t5-base', return_dict=True)
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
    inputs = tokenizer.encode("summarize: " + text, return_tensors='pt', truncation=True)
    # max_words = word_count(text, percentage, max_words)
    outputs = model.generate(inputs, max_length=240, min_length=200, num_beams=4,
                             length_penalty=2.0, no_repeat_ngram_size=3)
    summary = tokenizer.decode(outputs[0])
    summary = summary[5:-4]

    # if we want an output file
    # with open("Output.txt", "w") as text_file:
    #     text_file.write("Summary: " % summary)

    return summary

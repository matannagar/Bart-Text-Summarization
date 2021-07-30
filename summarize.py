import docx2txt
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import re
from open_files.clean_html import open_html
from open_files.clean_pdf import open_pdf
from open_files.clean_text import clean_text


def summary_length(text, percentage=15):
    # count words in string
    res = len(re.findall(r'\w+', text))
    # return min words in summary
    res = res * percentage * (1 / 100)

    return int(res)


def summarize(filename, percentage):
    if filename[-4:] == "docx":
        text = docx2txt.process(filename)
    elif filename[-4:] == "html":
        text = open_html(filename)
    elif filename[-3:] == "pdf":
        text = open_pdf(filename)
    else:
        with open(filename, 'r') as file:
            text = file.read()
    # remove links, specials signs, emails...
    text = clean_text(text)
    # calculate how many words user want's in his summary
    words_in_summary = summary_length(text, percentage)

    tokenizer = AutoTokenizer.from_pretrained("facebook/bart-large-cnn")
    model = AutoModelForSeq2SeqLM.from_pretrained("facebook/bart-large-cnn")

    article_input_ids = \
        tokenizer.encode(text, return_tensors='pt', truncation=True)
    outputs = model.generate(article_input_ids,
                             num_beams=4,
                             length_penalty=2.0,
                             min_length=words_in_summary,
                             max_length=words_in_summary + 50,
                             no_repeat_ngram_size=3)

    summary = tokenizer.decode(outputs[0])
    summary = summary[6:-4]

    return summary


def summarize_from_web(url, percentage=15):
    text = open_html(url)

    # remove links, specials signs, emails...
    text = clean_text(text)
    # calculate how many words user want's in his summary
    words_in_summary = summary_length(text, percentage)

    tokenizer = AutoTokenizer.from_pretrained("facebook/bart-large-cnn")
    model = AutoModelForSeq2SeqLM.from_pretrained("facebook/bart-large-cnn")

    article_input_ids = \
        tokenizer.encode(text, return_tensors='pt', truncation=True)
    outputs = model.generate(article_input_ids,
                             num_beams=4,
                             length_penalty=2.0,
                             min_length=words_in_summary,
                             max_length=words_in_summary + 50,
                             no_repeat_ngram_size=3)

    summary = tokenizer.decode(outputs[0])
    summary = summary[7:-4]

    return summary

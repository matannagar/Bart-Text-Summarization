# from summarizer import Summarizer
import docx2txt
from transformers.testing_utils import torch_device

from open_files.clean_html import open_html
from open_files.clean_pdf import open_pdf
from open_files.clean_text import clean_text
# from transformers import BartForConditionalGeneration, BartTokenizer
from transformers import BartTokenizer, BartForConditionalGeneration, BartConfig
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM


def bart_summarize(filename):
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
    tokenizer = AutoTokenizer.from_pretrained("facebook/bart-large-cnn")
    model = AutoModelForSeq2SeqLM.from_pretrained("facebook/bart-large-cnn")

    article_input_ids = \
        tokenizer.encode(text, return_tensors='pt', truncation=True)
    outputs = model.generate(article_input_ids,
                             num_beams=4,
                             length_penalty=2.0,
                             min_length=200,
                             max_length=240,
                             no_repeat_ngram_size=3)

    summary_txt = tokenizer.decode(outputs[0])

    return summary_txt

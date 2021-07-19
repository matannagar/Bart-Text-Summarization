import docx2txt
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM


def summarize(filename, num_beam=4, num_words=50):
    tokenizer = AutoTokenizer.from_pretrained('./t5-base')
    model = AutoModelForSeq2SeqLM.from_pretrained('./t5-base', return_dict=True)

    if filename[-4:] == "docx":
        text = docx2txt.process(filename)
    else:
        with open(filename, 'r') as file:
            text = file.read()

    inputs = tokenizer.encode("summarize: " + text, return_tensors='pt', truncation=True)

    outputs = model.generate(inputs, max_length=num_words, min_length=80, length_penalty=5., num_beams=num_beam)
    summary = tokenizer.decode(outputs[0])
    summary = summary[5:-4]

    return summary

from summarizer import TransformerSummarizer
import docx2txt
from open_files.clean_html import open_html
from open_files.clean_pdf import open_pdf


def GPT_summarize(filename):
    if filename[-4:] == "docx":
        text = docx2txt.process(filename)
    elif filename[-4:] == "html":
        text = open_html(filename)
    elif filename[-3:] == "pdf":
        text = open_pdf(filename)
    else:
        with open(filename, 'r') as file:
            text = file.read()
    
    GPT2_model = TransformerSummarizer(transformer_type="GPT2", transformer_model_key="gpt2-medium")
    full = ''.join(GPT2_model(text, max_length=200, min_length=10))

    return full


if __name__ == "__main__":
    # print(GPT_summarize("Tests/Articles/interviews.docx"))
    # print(GPT_summarize("Tests/Articles/interviews.docx"))

    # print(bert_summarize("Articles/loans.html"))
    # print(bert_summarize("Articles/loans2.html"))
    # print(bert_summarize("Articles/interview2.pdf"))
    # print(bert_summarize("Articles/credit.docx"))

    print(GPT_summarize("../Tests/Articles/test.html"))
    # print(bert_summarize("Articles/loans2.html"))
    # print(bert_summarize("Articles/interview2.pdf"))
    # print(bert_summarize("Articles/credit.docx"))

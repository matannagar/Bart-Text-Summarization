from cleantext import clean
import docx2txt


def clean_text(text):
    res = clean(text,
                fix_unicode=False,  # fix various unicode errors
                to_ascii=True,  # transliterate to closest ASCII representation
                lower=True,  # lowercase text
                no_line_breaks=False,  # fully strip line breaks as opposed to only normalizing them
                no_urls=True,  # replace all URLs with a special token
                no_emails=True,  # replace all email addresses with a special token
                no_phone_numbers=True,  # replace all phone numbers with a special token
                no_numbers=False,  # replace all numbers with a special token
                no_digits=False,  # replace all digits with a special token
                no_currency_symbols=False,  # replace all currency symbols with a special token
                no_punct=False,  # remove punctuations
                # replace_with_punct="",  # instead of removing punctuations you may replace them
                replace_with_url="<URL>",
                replace_with_email="<EMAIL>",
                replace_with_phone_number="<PHONE>",
                # replace_with_number="<NUMBER>",
                # replace_with_digit="0",
                # replace_with_currency_symbol="<CUR>",
                lang="en"  # set to 'de' for German special handling
                )
    return res


if __name__ == "__main__":
    text = docx2txt.process("Tests/Articles/interviews.docx")
    print(clean_text(text))
    # print(summarize("Articles/interview2.pdf"))
    # print(summarize("Articles/loans.html"))
    # print(summarize("Articles/loans2.html"))
    # print(summarize("Articles/credit.docx"))

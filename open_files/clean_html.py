from urllib.request import urlopen
from bs4 import BeautifulSoup
import codecs


def open_html(filepath, article_text="None"):
    f = codecs.open(filepath, encoding='utf8')

    ''' possible to read directly from address:
    url = "http://news.bbc.co.uk/2/hi/health/2284783.stm"
    html = urlopen(url).read()'''

    soup = BeautifulSoup(f, features="html.parser")

    # kill all script and style elements
    for script in soup(["script", "style"]):
        script.extract()  # rip it out

    article = soup.find("body").findAll('p')
    for element in article:
        article_text += '\n' + ''.join(element.findAll(text=True))

    # break into lines and remove leading and trailing space on each
    lines = (line.strip() for line in article_text.splitlines())
    # break multi-headlines into a line each
    chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
    # drop blank lines
    text = '\n'.join(chunk for chunk in chunks if chunk)
    # print(text)
    return text

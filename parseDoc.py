import docx2txt
import nltk

# nltk.download('stopwords')

# nltk.download('punkt')
text = docx2txt.process("test.docx")

# split into words
from nltk.tokenize import word_tokenize
import string
from nltk.corpus import stopwords

tokens = word_tokenize(text)
# convert to lower case
tokens = [w.lower() for w in tokens]
# remove punctuation from each word
table = str.maketrans('', '', string.punctuation)
stripped = [w.translate(table) for w in tokens]
# remove remaining tokens that are not alphabetic
words = [word for word in stripped if word.isalpha()]
# filter out stop words
stop_words = set(stopwords.words('english'))
print(stop_words)
words = [w for w in words if not w in stop_words]
stripped = [w.translate(table) for w in words]

print(stripped)

import pandas as pd
import nltk

# tokenizing - words tokenizers ... or sentence
# corpora - body oof text, medical journals.. presidential speeches..
# lexicon - words and their meaning
nltk.download()

text = "Apple acquired Zoon in China on Wednesday 6th May 2020. \
This news has made Apple and Google stock jump by 5% on Dow Jones Index in the\
    United States of America"

# tokenize to words
words = nltk.word_tokenize(text)
# label words as noun, object, verb ...
pos_tags = nltk.pos_tag(words)

chunks = nltk.ne_chunck(pos_tags, binary=True)  # either NE or not NE
for chunk in chunks:
    print(chunk)

entities = []
labels = []
for chunk in chunks:
    if hasattr(chunk, 'label'):
        entities.append(' '.join(c[0] for c in chunk))
        labels.append(chunk.label())

entities_labels = list(set(zip(entities, labels)))
entities_df = pd.DataFrame(entities_labels)
entities_df.columns = ["Entities", "Labels"]

print(entities_df)

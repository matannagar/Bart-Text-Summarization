"""
Web-App based on flask library
"""
from flask import *
from flask import request
import os
from werkzeug.utils import secure_filename

from summarize import summarize, summarize_from_web
from named_entity_recognition.create_dictionary import turn_into_dictionary
from named_entity_recognition.ner_tree import create_entity_tree

application = app = Flask(__name__)
# enter here the path of the server
app.config['UPLOAD_PATH'] = 'C:/Users/public'
# app.config['UPLOAD_PATH'] = '/var/app/current'
# allowed types
app.config['UPLOAD_EXTENSIONS'] = ['.docx', '.doc', '.txt', '.pdf', '.html']
app.secret_key = "super secret key"

# homepage


@app.route('/')
def upload():
    return render_template("index.html")


@app.route('/index', methods=['POST', 'GET'])
def index(glob_var="", dictionary=""):
    if request.method == 'POST':
        print("started flask")
        max_words = request.form['max-words']
        if max_words != '':
            max_words = int(max_words)

        percentage = request.form['percentage']
        if percentage != '':
            percentage = int(percentage)

        dictionary = turn_into_dictionary()

        # attempt to get file1
        f = request.files['file1']
        if secure_filename(f.filename) == '':
            # attempt to get file2
            f = request.files['file2']
            if secure_filename(f.filename) != '':
                # possible method of reading file directly : input_data = f.stream.read().decode("utf-8"), not working with docx
                filename = secure_filename(f.filename)
                if filename != '':
                    file_ext = os.path.splitext(filename)[1]
                    # verify type of file
                    if file_ext not in app.config['UPLOAD_EXTENSIONS']:
                        return render_template("index.html", error="Only .docx or .txt allowed!")
                    path = os.path.join(app.config['UPLOAD_PATH'], filename)
                    f.save(path)

                    summary = summarize(path, percentage, max_words)
                    glob_var = summary

                    return render_template("index.html", name=f.filename, summary=summary, dictionary=dictionary)
            # attempt to get URL
            else:
                f = request.form['input_url']
                if f != '':
                    summary = summarize_from_web(f, percentage, max_words)
                    return render_template("index.html", name="web", summary=summary, dictionary=dictionary)
                else:  # if no file was chosen
                    print("no file chosen")
                    return render_template("index.html", error="You have to pick a file!")
            # session['my_var'] = summary
            # redirect(url_for('entity_tree'))
    else:
        return render_template("index.html", summary=glob_var)


# currently not needed

# @app.route('/entity_tree', methods=['POST', 'GET'])
# def entity_tree():
#     if request.method == 'POST':
#         pass
#     else:
#         ner_data = create_entity_tree(session.get('my_var', None))
#         return render_template('entity_tree.html', ner_data=ner_data)


# need to be erased

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)

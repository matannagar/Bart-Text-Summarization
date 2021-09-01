"""
Web-App based on flask library
"""
from flask import *
from flask import request
import os
from werkzeug.utils import secure_filename

from summarize import summarize, summarize_from_web

application = app = Flask(__name__)
# enter here the path of the server
app.config['UPLOAD_PATH'] = 'C:/Users/public'
# app.config['UPLOAD_PATH'] = '/var/app/current'
# allowed types
app.config['UPLOAD_EXTENSIONS'] = ['.docx', '.doc', '.txt', '.pdf', '.html']


# homepage
@app.route('/')
def upload():
    return render_template("index.html")


@app.route('/index', methods=['POST', 'GET'])
def index(glob_var=""):
    if request.method == 'POST':
        print("started flask")
        max_words = request.form['max-words']

        if max_words != '':
            max_words = int(max_words)

        percentage = request.form['percentage']
        if percentage != '':
            percentage = int(percentage)

        # if request.files.get('file1', False):
        #     f = request.files['file2']
        # else:
        #     f = request.files['file1']
        f = request.files['file1']
        if secure_filename(f.filename) == '':
            f = request.files['file2']
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
        else:  # if no file was chosen
            print("no file chosen")
            return render_template("index.html", error="You have to pick a file!")
        return render_template("index.html", name=f.filename, summary=summary, status="file_uploaded successfully")
    else:
        return render_template("index.html", summary=glob_var)


# need to be erased
if __name__ == '__main__':
    app.run(debug=True)

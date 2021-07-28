"""
Web-App based on flask library
"""
from flask import *
from flask import request
import os
from werkzeug.utils import secure_filename

from summarize import summarize

app = Flask(__name__)
# enter here the path of the server
app.config['UPLOAD_PATH'] = 'C:/Users/public'
# allowed types
app.config['UPLOAD_EXTENSIONS'] = ['.docx', '.txt']


# homepage
@app.route('/')
def upload():
    return render_template("index.html")


@app.route('/index', methods=['POST'])
def index():
    if request.method == 'POST':
        num_words = int(request.form['max_words'])
        min_words = int(request.form['min_words'])
        f = request.files['file']
        # possible method of reading file directly : input_data = f.stream.read().decode("utf-8"), not working with docx
        filename = secure_filename(f.filename)
        if filename != '':
            file_ext = os.path.splitext(filename)[1]
            # verify type of file
            if file_ext not in app.config['UPLOAD_EXTENSIONS']:
                return render_template("index.html", error="Only .docx or .txt allowed!")
            path = os.path.join(app.config['UPLOAD_PATH'], filename)
            f.save(path)
            summary = summarize(path, min_words, num_words)
        else:  # if no file was chosen
            return render_template("index.html", error="You have to pick a file!")
        return render_template("index.html", name=f.filename, summary=summary, status="file_uploaded successfully", )


# need to be erased
if __name__ == '__main__':
    app.run(debug=True)

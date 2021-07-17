from flask import *
from flask import request
import os
from werkzeug.utils import secure_filename

from summarize import summarize

app = Flask(__name__)
app.config['UPLOAD_PATH'] = 'C:/Users/matan/Dropbox/My PC (DESKTOP-RLTMVS3)/Desktop/myGit/pythonProject1'
app.config['UPLOAD_EXTENSIONS'] = ['.docx', '.txt']


@app.route('/')
def upload():
    return render_template("index.html")


@app.route('/success', methods=['POST'])
def success():
    if request.method == 'POST':
        num_words = int(request.form['num_words'])
        num_beams = int(request.form['num_beams'])
        f = request.files['file']
        filename = secure_filename(f.filename)
        if filename != '':
            file_ext = os.path.splitext(filename)[1]
            if file_ext not in app.config['UPLOAD_EXTENSIONS']:
                return render_template("index.html", error="wrong file type")
            path = os.path.join(app.config['UPLOAD_PATH'], filename)
            f.save(path)
            summary = summarize(path, num_beams, num_words)
        else:
            return render_template("index.html", error="you have to pick a file!")
        return render_template("index.html", name=f.filename, summary=summary, status="file_uploaded successfully", )


if __name__ == '__main__':
    app.run(debug=True)




//DOWNLOAD FILE
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

//DRAG & DROP FUNCTIONALITY
(function () {
  var dropzone = document.getElementById('dropzone');

  dropzone.ondrop = function (e) {
    e.preventDefault();
    this.className = 'dropzone';
  }
  dropzone.ondragover = function () {
    this.className = 'dropzone dragover';
    return false;
  }
  dropzone.ondragleave = function () {
    this.className = 'dropzone'
    return false;
  }
}())

dropzone.ondrop = function (evt) {
  // pretty simple -- but not for IE :(
  fileInput.files = evt.dataTransfer.files;

  // If you want to use some of the dropped files
  const dT = new DataTransfer();
  dT.items.add(evt.dataTransfer.files[0]);
  dT.items.add(evt.dataTransfer.files[3]);
  fileInput.files = dT.files;

  evt.preventDefault();
};

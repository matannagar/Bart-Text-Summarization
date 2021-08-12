(function(){
	var dropzone = document.getElementById('dropzone');

	dropzone.ondrop=function(e){
		e.preventDefault();
		this.className='dropzone';
	}
	dropzone.ondragover = function(){
		this.className = 'dropzone dragover';
		return false;
	}
	dropzone.ondragleave = function(){
		this.className = 'dropzone'
		return false;
	}
}())
  // FUNCTIONALITY
  // dropzone.ondragover = dropzone.ondragenter = function(evt) {
  //   evt.preventDefault();
  // };-
  
  dropzone.ondrop = function(evt) {
    // pretty simple -- but not for IE :(
    fileInput.files = evt.dataTransfer.files;
  
    // If you want to use some of the dropped files
    const dT = new DataTransfer();
    dT.items.add(evt.dataTransfer.files[0]);
    dT.items.add(evt.dataTransfer.files[3]);
    fileInput.files = dT.files;
  
    evt.preventDefault();
  };

  //on change event listener for #file-select
document.getElementById("fileElem").onchange = function() {

    //call getFileSelected method
    getFileSelected();

};

function getFileSelected(){

    //get the value of the input file element
    var getFileSelected = document.getElementById("fileElem").value;

    //display the results of the input file element
    //you can append something before the getFileSelected value below
    //like an image tag for your icon or a string saying "file selected:"
    //for example.
    document.getElementById("fileElem").innerHTML = getFileSelected;

}
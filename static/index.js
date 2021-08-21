


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


    //LOADING 
    $(document).ready(function(){
      $(".icon-bg").click(function () {
          $(".btn").toggleClass("active");
          $(".icon-bg").toggleClass("active");
          $(".container").toggleClass("active");
          $(".box-upload").toggleClass("active");
          $(".box-caption").toggleClass("active");
          $(".box-tags").toggleClass("active");
          $(".private").toggleClass("active");
          $(".set-time-limit").toggleClass("active");
          $(".button").toggleClass("active");
      });
  
      $(".button").click(function () {
          $(".button-overlay").toggleClass("active");
      });
  
      $(".iconmelon").click(function () {
          $(".box-upload-ing").toggleClass("active");
          $(".iconmelon-loaded").toggleClass("active");
      });
  
      $(".private").click(function () {
          $(".private-overlay").addClass("active");
          $(".private-overlay-wave").addClass("active");
      });
  });


  


      document.addEventListener("DOMContentLoaded", quest_82391_features);
    0
0

//

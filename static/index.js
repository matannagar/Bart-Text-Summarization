


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

window.smoothScroll = function (target) {
  var scrollContainer = target;
  do { //find scroll container
    scrollContainer = scrollContainer.parentNode;
    if (!scrollContainer) return;
    scrollContainer.scrollTop += 1;
  } while (scrollContainer.scrollTop == 0);

  var targetY = 0;
  do { //find the top of target relatively to the container
    if (target == scrollContainer) break;
    targetY += target.offsetTop;
  } while (target = target.offsetParent);

  scroll = function (c, a, b, i) {
    i++; if (i > 30) return;
    c.scrollTop = a + (b - a) / 30 * i;
    setTimeout(function () { scroll(c, a, b, i); }, 20);
  }
  // start scrolling
  scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}

$(document).ready(function () {
  $('.create_graph').on('click', function () {
    summary = document.getElementById('temp').innerHTML;
    req = $.ajax({
      url: '/entity_tree',
      type: 'GET',
      data: { summary: summary },
      success: function (data) {
        window.open("http://127.0.0.1:8887/temp_graph.png", '_blank', "height=400,width=400");
      }
    })
  });
});

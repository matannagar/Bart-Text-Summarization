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
    summary = document.getElementById('bart_summary').innerHTML;
    req = $.ajax({
      url: '/entity_tree',
      type: 'GET',
      data: { summary: summary },
      success: function (data) {
        window.open("http://127.0.0.1:8887/temp_graph.png", 'entity tree', "height=640,width=480");
      }
    })
  });
});

// find entities
function findEntities() {
  var flag = false;
  //get the dictionary that was sent from python (supposed to be inivisible)
  json_dict = document.getElementById('dictionary').innerHTML;
  summarize = document.getElementById('bart_summary').innerHTML; // iterate over keys of json object 
  if (json_dict === '  ') {
    document.getElementById('bart_summary').innerHTML = "Please pick a file and click on summary!";
    return;
  }
  else if (summarize === " ") {
    summarize = document.getElementById('Summary').innerHTML;
    flag = true;
  }

  json_dict = JSON.parse(json_dict);
  var res = summarize;
  for (index in json_dict) {
    if (summarize.includes(index) === true) {
      res = res.replace(index, '<div class="tooltip"><b>' + index + '</b><span class="tooltiptext">' + json_dict[index] + '</span></div >');
    }
  }
  if (flag === true)
    document.getElementById('Summary').innerHTML = res;
  else document.getElementById('bart_summary').innerHTML = res;
}

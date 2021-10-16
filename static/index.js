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
    if (summary === " ") {
      document.getElementById('bart_summary').innerHTML = "Please pick a file and click on summary!";
      return;
    }
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


// sharing options (linkedin twitter gmail)
//open registration window
function to_open() {
  const openWindow = window.open(
    "http://localhost/test/form.html",
    "rating",
    "width=400,height=520,left=150,top=200"
  );
  const timer = setInterval(() => {
    if (openWindow.closed) {
      clearInterval(timer);
      // alert('"Secure Payment" window closed!');
      document.getElementById("outer_download_button").click();
    }
  }, 500);
}
// Gets variable from URL
function getUrlVars() {
  var vars = [],
    hash;
  var hashes = window.location.href
    .slice(window.location.href.indexOf("?") + 1)
    .split("&");
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split("=");
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

function getUrlParam(parameter) {
  var urlparameter;
  if (window.location.href.indexOf(parameter) > -1) {
    urlparameter = getUrlVars()[parameter];
  }
  return urlparameter;
}

serialize = function (obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};
// Loading that parameter if present
window.onload = function () {
  var mytext = getUrlParam("Summary");
  var my_ready_dictionary = getUrlParam("Dictionary");
  if (mytext !== undefined) {
    document.getElementById("Summary").innerHTML = decodeURIComponent(mytext);
    document.getElementById("dictionary").innerHTML = decodeURIComponent(my_ready_dictionary);
  }

  var url = "http://127.0.0.1:5000/index?";
  // var url = "http://mywebsite.com/index?";

  //get summary&dictionary from previously loaded file
  var summary_for_url = document.getElementById("bart_summary").innerHTML;
  var dictionary_for_url = document.getElementById("dictionary").innerHTML;
  if (summary_for_url != " ") {
    //create encoded summary for URL
    var url_variables = serialize({ Summary: String(summary_for_url), Dictionary: String(dictionary_for_url) });

    url = url + url_variables;
    console.log(url);
  }
  //SHORTEN URL//
  var shorturl;
  var data = {
    "domain": "1pie.short.gy",
    "originalURL": decodeURIComponent(url)
  };

  fetch('https://api.short.io/links/public', {
    method: 'post',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': 'pk_cGdSPwfEMvDXGUy6'
    },
    body: JSON.stringify(data)
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    shorturl = data.shortURL;
  }).then(function () {

    //MAIL CODE
    var p1 = "mailto:?body=Check out this Article Summarization by HiLo ";
    var p2 = "&subject=HiLo's Summarization Tool";
    var mail = p1 + shorturl + p2;
    var a = document.getElementById("mail");
    a.href = mail;

    //LINKEDIN CODE
    var linkedin =
      "https://www.linkedin.com/shareArticle?mini=true&url=" +
      url +
      "&title=Temporary Title&source=Chillyfacts";
    var b = document.getElementById("linkedin");
    b.href = linkedin;

    //TWITTER CODE
    var twitter =
      "https://twitter.com/intent/tweet?text=" + shorturl;
    var c = document.getElementById("twitter");
    c.href = twitter;
  })
};

//JQUERY
$(document).ready(function () {
  jQuery("input#fileElem").change(function () {
    alert("File Chosen")
  });
  jQuery("input#file1").change(function () {
    alert("File Chosen")
  });
  jQuery("input#file1").change(function () {
    $('html,body').animate({
      scrollTop: $(".buttonSummarize-outer").offset().top
    },
      'slow');
  });
  jQuery("input#fileElem").change(function () {
    $('html,body').animate({
      scrollTop: $(".buttonSummarize-outer").offset().top
    },
      'slow');
  });
});

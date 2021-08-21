 //open registration window 
    function to_open() {
      const openWindow = window.open("http://localhost/test/form.html", 'rating', "width=400,height=520,left=150,top=200");
      const timer = setInterval(() => {
          if (openWindow.closed) {
              clearInterval(timer);
              // alert('"Secure Payment" window closed!');
              document.getElementById('outer_download_button').click();
          }
      }, 500);


  }
  // Gets variable from URL
  function getUrlVars() {
      var vars = [], hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for (var i = 0; i < hashes.length; i++) {
          hash = hashes[i].split('=');
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

  // CREATE ENCODED URL
  function buildUrl(url, parameters) {
      var qs = "";
      for (var key in parameters) {
          var value = parameters[key];
          qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
      }
      if (qs.length > 0) {
          qs = qs.substring(0, qs.length - 1); //chop off last "&"
          url = url + "?" + qs;
      }
      return url;

  }

  serialize = function (obj) {
      var str = [];
      for (var p in obj)
          if (obj.hasOwnProperty(p)) {
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
      return str.join("&");
  }

  // Loading that parameter if present
  window.onload = function () {
      var mytext = getUrlParam('Summary');
      if (mytext !== undefined)
          document.getElementById('Summary').innerHTML = decodeURIComponent(mytext);

      // var url = "http://127.0.0.1:5000/index?";
      var url = "http://mywebsite.com/index?";

      //get summary from previously loaded file
      var summary_for_url = document.getElementById('temp').innerHTML
      //create encoded summary for URL
      var temp = serialize({ Summary: String(summary_for_url) });

      //MAIL CODE
      var p1 = "mailto:?body=Check out this Article Summarization by HiLo \n" + url + "\n";
      var p2 = "&subject=HiLo's Summarization Tool";
      var mail = p1 + encodeURIComponent(temp) + p2 + "\n";
      var a = document.getElementById('mail');
      a.href = mail;

      //LINKEDIN CODE
      var linkedin = "https://www.linkedin.com/shareArticle?mini=true&url=" + url + encodeURIComponent(temp) + "&title=Temporary Title&source=Chillyfacts";
      var b = document.getElementById('linkedin');
      b.href = linkedin;

      //TWITTER CODE
      var twitter = "https://twitter.com/intent/tweet?text=" + url + encodeURIComponent(temp);
      var c = document.getElementById('twitter');
      c.href = twitter;
  };

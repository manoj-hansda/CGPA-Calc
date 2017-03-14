function content_top_offset() {
    $('body').css('padding-top', $('.navbar-fixed-top').outerHeight(true) + 'px' );
}

$(window).resize(content_top_offset);
$(document).ready(content_top_offset);

$(document).ready(function(){
   $('.revert-caret').click(function(){
        $(this).toggleClass('dropup');
    });

    $('input').click(function () {
        $('input:not(:checked)').parent('.btn-block label').removeClass("btn-success");
        $('input:checked').parent('.btn-block label').addClass("btn-success");
    });    
});

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}
var url = "https://api.ethexindia.com/ticker/";
var xhr = createCORSRequest('GET', url);
if (!xhr) {
  throw new Error('CORS not supported');
}

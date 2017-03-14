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

$.getJSON( "https://api.ethexindia.com/ticker/", function( data ) {
  var items = [];
  $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
  });
 
  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );
});

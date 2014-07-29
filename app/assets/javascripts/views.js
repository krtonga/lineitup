


function setWindowStyle(){
  console.log($(window).width())
  if ($(window).width() < 768 && $(window).width() > 479){
    descriptionbarMED();
  } else if ($(window).width() < 479){
    disabledescriptionbar();
    descriptionbarSMALL();
  } else {
    disabledescriptionbar();
  }
};

function searchbar(){
  $('.search-bar').delay(200).animate({'marginLeft':'-275px'},200);
  $('.tab').on('click', function() {
    if ( $('.search-bar').css('marginLeft') === '-275px' ) {
      $('.search-bar').animate({'marginLeft':'-2px'},200);
    } else {
      $('.search-bar').animate({'marginLeft':'-275px'},200);
  }});
};

function descriptionbarMED(){
    $('.eventInfo').delay(200).animate({'right':'-20px'},200);
    $('.event-details-tab').on('click', function() {
      console.log("clicked desc");
      if ( $('.eventInfo').css('right') === '-440px' ) {
        $('.eventInfo').animate({'right':'-2px'},200);
      } else {
        $('.eventInfo').animate({'right':'-440px'},200);
    }});
};

function descriptionbarSMALL(){
    $('.eventInfo').delay(200).animate({'right':'-20px'},200);
    $('.event-details-tab').on('click', function() {
      console.log("clicked desc");
      if ( $('.eventInfo').css('right') === '-320px' ) {
        $('.eventInfo').animate({'right':'-20px'},200);
      } else {
        $('.eventInfo').animate({'right':'-320px'},200);
    }});
};

function disabledescriptionbar(){
    $('.eventInfo').delay(200).animate({'right':'none'},200);
};


// EventDetailSticker - to be re-examined later





// FUTURE ORGANIZATION FOR SAVED CATEGORIES
$(function() {
  $( ".column" ).sortable({
    connectWith: ".column",
    handle: ".portlet-header",
    cancel: ".portlet-toggle",
    placeholder: "portlet-placeholder ui-corner-all"
  });

  $( ".portlet" )
    .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
    .find( ".portlet-header" )
      .addClass( "ui-widget-header ui-corner-all" )
      .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");

  $( ".portlet-toggle" ).click(function() {
    var icon = $( this );
    icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
    icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
  });
});


$(function(){
  $(".datepickerFrom" ).datepicker();
  $( ".datepickerFrom" ).datepicker("setDate", "0");
  $(".datepickerTo" ).datepicker();
  $( ".datepickerTo" ).datepicker("setDate", "7" );
  $( document ).tooltip();
  $( "#tabs" ).tabs();
  searchbar();

  $('#map_tab_for_click').on('click', function() {
    console.log('map clicked!');
    if ($('#from-where').text() == "search") {
      MapBuild(eventCollection.models);
    } else {
      MapBuild(userEvents.models);
    }
  });
});



function searchbar(){
  $('.search-bar').delay(200).animate({'marginLeft':'-275px'},200);
  $('.tab').on('click', function() {
    if ( $('.search-bar').css('marginLeft') === '-275px' ) {
      $('.search-bar').animate({'marginLeft':'-2px'},200);
    } else {
      $('.search-bar').animate({'marginLeft':'-275px'},200);
  }});
};

function descriptionbar(){
  var windowWidth = $(window).width();
  if(windowWidth > 767){
    $('.eventInfo').delay(200).animate({'right':'-440px'},200);
    $('.event-details-tab').on('click', function() {
      console.log("clicked desc");
      if ( $('.eventInfo').css('right') === '-440px' ) {
        $('.eventInfo').animate({'right':'-2px'},200);
      } else {
        $('.eventInfo').animate({'right':'-440px'},200);
    }});
  }
};


// EventDetailSticker - to be re-examined later

$(document).ready(function(){
  var ei = $(".eventInfo")
  var eiPos = ei.position().top;
  var tabPos = $("#tabs").position().top;
  var pos = eiPos + tabPos;
  $(window).scroll(function(){
    var windowpos = $(window).scrollTop() - tabPos;
    if (windowpos >= pos) {
      ei.addClass("fixed");
    } else {
      ei.removeClass("fixed");
    }
  });
});




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

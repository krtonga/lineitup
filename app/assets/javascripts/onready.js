
var eventCollection = new EventCollection();



$(function() {
  accountSetUp();


  eventCollection.fetch();

});



$(function(){


  $(document).on('mousedown', function(e) {
    //console.log("yo");
    $(".mapbutton").on("click", function(){
    clickedEvent($('.mapbutton').val());
  });
});

});


$(function() {

  $('.intro-pg').on('click', function() {

    $('.search-bar').animate({'margin-left':'-2px'},200);
  });


});

$(function(){
  $(".datepickerFrom" ).datepicker();
  $( ".datepickerFrom" ).datepicker("setDate", "0");
  $(".datepickerTo" ).datepicker();
  $( ".datepickerTo" ).datepicker("setDate", "7" );
  $( document ).tooltip();
  $( "#tabs" ).tabs();
  searchbar();
  setWindowStyle();
  $(window).resize(setWindowStyle);


  $('#map_tab_for_click').on('click', function() {
    if ($('#from-where').text() == "search") {
      MapBuild(eventCollection.models);
    } else {
      MapBuild(userEvents.models);
    }
  });
});


$(document).ready(function(){
  var ei = $(".eventInfo")
  // var eiPos = ei.position().top;
  // tabPos = $("#tabs").position().top;
  // pos = eiPos + tabPos;
  $(window).scroll(function(){
    windowpos = $(window).scrollTop();
    if (windowpos >= 155 && $('#event-list').height() > $('.eventInfo').height()) {
      ei.addClass("fixed");
    } else {
      ei.removeClass("fixed");
    }
  });
});

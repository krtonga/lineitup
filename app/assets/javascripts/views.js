
$(function(){
  $(".datepickerFrom" ).datepicker();
  $( ".datepickerFrom" ).datepicker("setDate", "0");
  $(".datepickerTo" ).datepicker();
  $( ".datepickerTo" ).datepicker("setDate", "7" );
  $( document ).tooltip();
  $( "#tabs" ).tabs();

  $( "#accordion" )
    .accordion({
      header: "> div > h3"
    })
    .sortable({
      axis: "y",
      handle: "h3",
      stop: function( event, ui) {
        ui.item.children( "h3" ).triggerHandler( "focusout" );
      }
    });

  $('#map_tab_for_click').on('click', function() {
    console.log('map clicked!');
    MapBuild();
  });


});


      $(document).ready(function(){
        var ei = $("#eventInfo")
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


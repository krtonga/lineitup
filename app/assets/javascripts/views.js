
$(function(){
  $(".datepickerFrom" ).datepicker();
  $( ".datepickerFrom" ).datepicker("setDate", "0");
  $(".datepickerTo" ).datepicker();
  $( ".datepickerTo" ).datepicker("setDate", "7" );
  $( document ).tooltip();
});



  $(function(){
    $( "#tabs" ).tabs();
  });
  $(function(){
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


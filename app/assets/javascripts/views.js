
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
});






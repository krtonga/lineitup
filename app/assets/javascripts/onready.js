
var eventCollection = new EventCollection();

$(function() {
  accountSetUp();
  eventCollection.fetch();
  listenForMapButton();
  openSearchBar();
  $(".datepickerFrom" ).datepicker();
  $( ".datepickerFrom" ).datepicker("setDate", "0");
  $(".datepickerTo" ).datepicker();
  $( ".datepickerTo" ).datepicker("setDate", "7" );
  $( document ).tooltip();
  $( "#tabs" ).tabs();
  searchbar();
  setWindowStyle();
  $(window).resize(setWindowStyle);
  mapSetup();
  scrollEventDetails();
});





// FUTURE ORGANIZATION FOR SAVED CATEGORIES
// $(function() {
//   $( ".column" ).sortable({
//     connectWith: ".column",
//     handle: ".portlet-header",
//     cancel: ".portlet-toggle",
//     placeholder: "portlet-placeholder ui-corner-all"
//   });

//   $( ".portlet" )
//     .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
//     .find( ".portlet-header" )
//       .addClass( "ui-widget-header ui-corner-all" )
//       .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");

//   $( ".portlet-toggle" ).click(function() {
//     var icon = $( this );
//     icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
//     icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
//   });
// });

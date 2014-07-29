
var eventCollection = new EventCollection();
var userEvents = new EventCollection();

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


$(function () {
  if ($('span')[0].id == "this_is_profile") {
    userEvents.fetchUserEvents();
  }
  $('#user-event-details-close').on('click', function() {
    $('#user-event-details-div').hide();
  });
  $('#user-event-details-delete').on('click', function() {
    $('#user-event-details-div').hide();
    clickedUserEvent($('#event_id_hide').text());

  });
  $('#event-details-close').on('click', function() {
    $('#event-details-div').hide();
  });
  $('#user_tab_for_click').on('click', function() {
    $('#from-where').text('user');
    userEvents = new EventCollection();
    userEvents.fetchUserEvents();
  });
  $('#search_tab_for_click').on('click', function() {
    console.log("profile");
    $('#from-where').text('search');
    userEvents.fetchUserEvents();
  });
}); // end document ready




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

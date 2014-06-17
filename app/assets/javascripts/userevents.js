

EventCollection.prototype.fetchUserEvents = function() {
  var that = this;
  $.ajax({
    url: '/events/userevents',
    dataType: 'json',
    success: function(data) {
      $('#user-event-list').html('');
      $.each(data, function(index, currEvent) {
        var newEvent = new EventModel(currEvent);
        //if (matchDates(newEvent) == true) {
          that.models.push(newEvent);
          var eventView = new EventView(newEvent);
          $('#user-event-list').append(eventView.renderUserEvents().el);
        //}
      });
    }
  });
} // end fetchUserEvents



var userEvents = new EventCollection();

$(function () {
  if ($('span')[0].id == "this_is_profile") {
    console.log("profile");
    userEvents.fetchUserEvents();
  }
  $('#user-event-details-close').on('click', function() {
    $('#user-event-details-div').hide();
  });
  $('#event-details-close').on('click', function() {
    $('#event-details-div').hide();
  });
  $('#user_tab_for_click').on('click', function() {
    console.log("profile");
    $('#from-where').text('user');
    userEvents.fetchUserEvents();
  });
  $('#search_tab_for_click').on('click', function() {
    console.log("profile");
    $('#from-where').text('search');
    userEvents.fetchUserEvents();
  });
}); // end document ready


EventView.prototype.renderUserEvents = function() {
  var $eventLi =$('<li>');
  var $link = $('<a>', {
    //html: "" + this.model.category + ': <strong>' + this.model.eventName + "</strong> Dates:  <em>" + dateHtml(this.model) + "</em>",
    html: this.model.eventName,
    href: '',
    id: this.model.eventID,
    click: function(){
      clickedUserEvent(this.id);
      return false;
    }
  });
  var that = this;
  $link.mouseenter(function() {
    timer = setTimeout(function() {
      console.log(that.model.webDescription);
      displayUserEventDetails(that.model);
    }, 1000);
  }).mouseleave(function() {
    clearTimeout(timer);
  });
  $eventLi.append($link);

  this.el = $eventLi;
  return this;
} // end renderUserEvents

function clickedUserEvent(id) {
  console.log("delete function?");
  var authenticityToken = $('input[name=authenticity_token]').val();
  $.ajax({
      url: '/events',
      method: 'delete',
      dataType: 'json',
      data: {authenticity_token: authenticityToken, event: {event_id: id}},
      success: function() {
        console.log('hello');
        window.location.reload();
      }
    });
} // end clickedUserEvent


function displayEventDetails(event) {
  $detailsList = $('#event-details-list')
  $detailsList.html('');
  var descriptionEl = $('<li>').html(event.webDescription);
  var eventUrl = $('<a>', {
                   text: event.eventUrl,
                   href: event.eventUrl
                });
  $detailsList.append(descriptionEl);
  $detailsList.append(eventUrl);
  $('#event-details-div').show();
  $('#event-details-close').show();

}



function displayUserEventDetails(event) {
  $detailsList = $('#user-event-details-list')
  $detailsList.html('');
  var descriptionEl = $('<li>').html(event.webDescription);
  var eventUrl = $('<a>', {
                   text: event.eventUrl,
                   href: event.eventUrl
                });
  $detailsList.append(descriptionEl);
  $detailsList.append(eventUrl);
  $('#user-event-details-div').show();
  $('#user-event-details-close').show();

}

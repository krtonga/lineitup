

EventCollection.prototype.fetchUserEvents = function() {
  var that = this;
  $.ajax({
    url: '/events/userevents',
    dataType: 'json',
    success: function(data) {
      $.each(data, function(index, currEvent) {
        var newEvent = new EventModel(currEvent);
        that.models.push(newEvent);
        var eventView = new EventView(newEvent);
        $('#user-event-list').append(eventView.renderUserEvents().el);
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
  $('#event-details-close').on('click', function() {
    $('#event-details-div').hide();
  });
}); // end document ready


EventView.prototype.renderUserEvents = function() {
  var $eventLi =$('<li>');
  var $link = $('<a>', {
    text: this.model.category + ':  ' + this.model.eventName,
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
      displayEventDetails(that.model);
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

function userDateHtml(event) {
  var weekday = new Array(7);
  weekday[0]=  "sun";
  weekday[1] = "mon";
  weekday[2] = "tue";
  weekday[3] = "wed";
  weekday[4] = "thu";
  weekday[5] = "fri";
  weekday[6] = "sat";
  recur_array = event.recurString.split(', ');
  if ($.inArray(recur_array[0], weekday) != -1) {
    return event.recurString;
  } else {
    date_string = "";
    $.each(recur_array, function (index, day) {
      var as_date = new Date(Date.parse(day)+(60*60*4*1000));
      day = (as_date.getMonth()+1) + '/' + as_date.getDate();
      date_string += day + ', ';
    });
    return date_string.slice(0,-2);
  }
}

EventCollection.prototype.fetchUserEvents = function() {
  var that = this;
  $.ajax({
    url: '/events/userevents',
    dataType: 'json',
    success: function(data) {
      $('#user-event-list').html('');
      $.each(data, function(index, currEvent) {
        var newEvent = new UserEventModel(currEvent);
        if (userMatchDates(newEvent) == true) {
          that.models.push(newEvent);
          var eventView = new EventView(newEvent);
          $('#user-event-list').append(eventView.renderUserEvents().el);
        }
      });
    }
  });
} // end fetchUserEvents



var userEvents = new EventCollection();

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


EventView.prototype.renderUserEvents = function() {
  var $eventLi =$('<li>');
  var that = this;
  var $link = $('<a>', {
    html: "" + this.model.category + ': <strong>' + this.model.eventName + "</strong> Dates:  <em>" + userDateHtml(this.model) + "</em>",
    href: '',
    id: this.model.eventID,
    click: function(){
      displayUserEventDetails(that.model);
      return false;
    }
  });
  var that = this;
  $link.mouseenter(function() {
    timer = setTimeout(function() {
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
  var authenticityToken = $('input[name=authenticity_token]').val();
  $.ajax({
      url: '/events',
      method: 'delete',
      dataType: 'json',
      data: {authenticity_token: authenticityToken, event: {event_id: id}},
      success: function() {
        console.log('hello');
        $('#from-where').text('user');
        userEvents = new EventCollection();
        userEvents.fetchUserEvents();
      }
  });
} // end clickedUserEvent


function displayEventDetails(event) {
  $titleDiv = $('.el-title');
  $detailsList = $('#event-details-list');
  $venueList = $('#venue-list');
  $titleDiv.html('');
  $detailsList.html('');
  $venueList.html('');
  var name = $('<h4>').html(event.eventName);
  var descriptionEl = $('<li>').html(event.webDescription);
  var eventUrl = $('<a>', {
                   text: event.eventUrl,
                   href: event.eventUrl
                });
  var venueUrl = $('<a>', {
                   text: event.venueName,
                   href: event.venueDetailUrl
                });
  var address = $('<p>').html('<em>' + event.address + '</em>')
  $titleDiv.append(name);
  $detailsList.append(descriptionEl);
  $detailsList.append(eventUrl);
  $venueList.append(venueUrl).append(address);

  $('#event-details-div').show();
  $('#event-details-close').show();
  $('.eventInfo').css("visibility", "visible");

}





function displayUserEventDetails(event) {
  $titleDiv = $('.user-el-title');
  $detailsList = $('#user-event-details-list');
  $venueList = $('#user-venue-list');
  $titleDiv.html('');
  $detailsList.html('');
  $venueList.html('');
  var name = $('<h4>').html(event.eventName);
  var descriptionEl = $('<li>').html(event.webDescription);
  var eventUrl = $('<a>', {
                   text: event.eventUrl,
                   href: event.eventUrl
                });
  var venueUrl = $('<a>', {
                   text: event.venueName,
                   href: event.venueDetailUrl
                });
  var address = $('<p>').html('<em>' + event.address + '</em>')
  $titleDiv.append(name);
  $detailsList.append(descriptionEl);
  $detailsList.append(eventUrl);
  $venueList.append(venueUrl).append(address);

  $('#user-event-details-div').show();
  $('#user-event-details-close').show();
  $('#user-event-details-delete').show();
  $('#event_id_hide').text(event.eventID);
  $('.eventInfo').css("visibility", "visible");

}

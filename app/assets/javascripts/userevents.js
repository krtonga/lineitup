
function UserEventModel(data) {
  this.startDate = data.start_date;
  this.endDate = data.end_date;
  this.recurString = data.recurstring;
  this.eventName = data.event_name;
  this.eventID = data.event_id;
  this.eventDateList = data.event_date_list;
  this.recurringStartDate = data.recurring_start_date;
  this.recurringEndDate = data.recurring_end_date;
  this.recurDays = data.recur_days;
  this.category = data.category;
  this.eventUrl = data.event_detail_url;
  this.webDescription = data.web_description;
  this.venueName = data.venue_name;
  this.venueDetailUrl = data.venue_detail_url;
  this.latitude = data.geocode_latitude;
  this.longitude = data.geocode_longitude;
  this.address = data.street_address;
  this.phone = data.telephone;
  this.venueUrl = data.venue_website;
  this.free = data.free;
}





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

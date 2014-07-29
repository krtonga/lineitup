
EventModel.prototype.cleanUpDates = function() {
  this.startDate = "hello" + this.eventName;
  if (this.eventDateList != undefined) {
    this.recurString = this.eventDateList;
    rawStartDate = $(this.eventDateList).first()[0];
    convertedStartDate = new Date(Date.parse(rawStartDate)+(60*60*4*1000));
    this.startDate = convertedStartDate;
    rawEndDate = $(this.eventDateList).last()[0];
    convertedEndDate = new Date(Date.parse(rawEndDate)+(60*60*4*1000));
    this.endDate = convertedEndDate;
  } else {
    this.startDate = this.recurringStartDate;
    this.endDate = this.recurringEndDate;
    this.recurString = this.recurDays;
  }
}


function EventModel(data) {
  this.startDate = undefined;
  this.endDate = undefined;
  this.recurString = undefined;
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
  this.cleanUpDates();
}

function EventCollection() {
  this.models = [];
}

EventCollection.prototype.fetch = function() {
  var that = this;
  $.ajax({
    url: '/events/show',
    dataType: 'json',
    data: {filter: $('#filter_string').text()},
    success: function(data) {
      $.each(data, function(index, currEvent) {
        var newEvent = new EventModel(currEvent);
        if (matchDates(newEvent)==true) {
          that.models.push(newEvent);
          var eventView = new EventView(newEvent);
          $('#event-list').append(eventView.render().el);
        }
      });
    }
  });

}

// EventCollection.prototype.sortByDate = function() {
// }


function dateHtml(event) {
  date_string = "";
  if (event.eventDateList != undefined) {
    $.each(event.recurString, function (index, day) {
      var as_date = new Date(Date.parse(day)+(60*60*4*1000));
      day = (as_date.getMonth()+1) + '/' + as_date.getDate();
      date_string += day + ', ';
    });
    return date_string.slice(0,-2);
  } else {
    $.each(event.recurString, function (index, day) {
      date_string += day + ', ';
    });
    return date_string.slice(0,-2);
  }

}





function EventView(eventModel) {
  this.model = eventModel;
  this.el = undefined;
}

EventView.prototype.render = function() {
  var $eventLi =$('<li>');
  var that = this;
  var $link = $('<a>', {
    html: "" + this.model.category + ': <strong>' + this.model.eventName + "</strong> Dates:  <em>" + dateHtml(this.model) + "</em>",
    href: '',
    id: this.model.eventID,
    click: function(){displayEventDetails(that.model); return false;},
    dblclick: function(){
      clickedEvent(this.id);
      return false;
    }
  });
  var that = this;
  $link.mouseenter(function() {
    timer = setTimeout(function() {
      displayEventDetails(that.model);
    }, 1000);

  }).mouseleave(function() {
    clearTimeout(timer);
  });
  $eventLi.append($link);

  this.el = $eventLi;
  $('.intro-pg').hide();
  $('#pretty_result_string').show();
  return this;
}


function clickedEvent(id) {
  if ($('.user-id-span').data("user") == "no_user") {
    $('#login_alert').show();
  } else {
    $.each(eventCollection.models, function(index, event){
      if (event.eventID == id) {
        event.create();
        $('#saved_alert').text('Saved ' + event.eventName);
        $('#saved_alert').show();
        $('#saved_from_map').text('Saved ' + event.eventName);
        $('#saved_from_map').show();
      }
    });
  }
}

EventModel.prototype.create = function() {
  var authenticityToken = $('input[name=authenticity_token]').val();
  $.ajax({
    url: '/events',
    method: 'post',
    dataType: 'json',
    data: {authenticity_token: authenticityToken, event: {event_name: this.eventName,
                                                          category: this.category,
                                                          end_date: this.endDate,
                                                          start_date: this.startDate,
                                                          recurstring: this.recurString.join(', '),
                                                          event_detail_url: this.eventUrl,
                                                          web_description: this.webDescription,
                                                          recurring_start_date: this.recurringStartDate,
                                                          recurring_end_date: this.recurringEndDate,
                                                          recur_days: this.recurDays,
                                                          venue_name: this.venueName,
                                                          venue_detail_url: this.venueDetailUrl,
                                                          geocode_latitude: this.latitude,
                                                          geocode_longitude: this.longitude,
                                                          street_address: this.address,
                                                          telephone: this.phone,
                                                          venue_website: this.venueUrl,
                                                          event_date_list: this.eventDateList,
                                                          event_id: this.eventID,
                                                          free: this.free
                                                        }},
    success: function(data) {
    }
  });
}


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

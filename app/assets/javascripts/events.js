
EventModel.prototype.cleanUpDates = function() {
  //console.log(this.recurDays);
  this.startDate = "hello" + this.eventName;
  // below is useful
  //y = new Date(Date.parse(x))
  //z=new Date(Date.parse(x)+(60*60*4*1000))
  if (this.eventDateList != undefined) {
    //console.log(this.eventDateList);
    this.recurString = this.eventDateList;
    rawStartDate = $(this.eventDateList).first()[0];
    convertedStartDate = new Date(Date.parse(rawStartDate)+(60*60*4*1000));
    this.startDate = convertedStartDate;
    rawEndDate = $(this.eventDateList).last()[0];
    convertedEndDate = new Date(Date.parse(rawEndDate)+(60*60*4*1000));
    this.endDate = convertedEndDate;
    //this.eventDateList = this.eventDateList.join(', ');
    //this.eventDateList = $(this.eventDateList).first();
  } else {
    //console.log(this.recurringEndDate);
    this.startDate = this.recurringStartDate;
    this.endDate = this.recurringEndDate;
    this.recurString = this.recurDays;
  }
}
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
  //this.cleanUpDates();
  //console.log(data.event_date_list.join());
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
  //console.log(data.event_date_list.join());
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
      that.sortByDate();
    }
  });

}

EventCollection.prototype.sortByDate = function() {
  //return this.sort();
  //sorted = eventCollection.models.sort(function(a, b){return a.startDate - b.startDate});
}


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
  //var $eventLi = $('<li>').text('Start:'+this.model.startDate + '  End:' + this.model.endDate + '  Recur:' + this.model.recurString);
  var $eventLi =$('<li>');
  var $link = $('<a>', {
    //text: 'Start:'+this.model.startDate + '  End:' + this.model.endDate + '  Recur:' + this.model.recurString,
    //html: "<strong>" + this.model.category + '</strong>: <h4> ' + this.model.eventName + "</h4> Start Date: <em>" + ";</em> End Date: <em>" + ";</em> Recurring Dates: <em>" + this.model.recurString + "</em>",
    html: "" + this.model.category + ': <strong>' + this.model.eventName + "</strong> Dates:  <em>" + dateHtml(this.model) + "</em>",
    href: '',
    id: this.model.eventID,
    click: function(){
      clickedEvent(this.id);
      return false;
    }
  });
  var that = this;
  $link.mouseenter(function() {
    timer = setTimeout(function() {
      console.log(that.model.webDescription);
      displayEventDetails(that.model);
    }, 1000);

    //console.log(that.model.eventID);
  }).mouseleave(function() {
    clearTimeout(timer);
  });
  $eventLi.append($link);

  this.el = $eventLi;
  return this;
}


function clickedEvent(id) {
  if ($('.user-id-span').data("user") == "no_user") {
    window.alert("Please log in to save an event.");
  }
  $.each(eventCollection.models, function(index, event){
    if (event.eventID == id) {
      //window.alert(event.eventID);
      //console.log(event);
      event.create();
    }
  });
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
      console.log(data);
    }
  });
}

var eventCollection = new EventCollection();

$(function () {
  //if ($('span')[0].id == "this_is_list") {
    eventCollection.fetch();
  //}
});

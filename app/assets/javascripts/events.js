
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
  } else {
    //console.log(this.recurringEndDate);
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
  this.category = data.category
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
    success: function(data) {
      $.each(data, function(index, currEvent) {
        var newEvent = new EventModel(currEvent);
        that.models.push(newEvent);
        var eventView = new EventView(newEvent);
        $('#event-list').append(eventView.render().el);
      });
      that.sortByDate();
    }
  });

}

EventCollection.prototype.sortByDate = function() {
  //return this.sort();
  //sorted = eventCollection.models.sort(function(a, b){return a.startDate - b.startDate});
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
    text: this.model.category + ':  ' + this.model.eventName,
    href: '',
    id: this.model.eventID,
    click: function(){
      clickedEvent(this.id);
      return false;
    }
  });
  var that = this;
  $link.hover(function() {
    console.log(that.model.eventID);
  });
  $eventLi.append($link);

  this.el = $eventLi;
  return this;
}


function clickedEvent(id) {
  $.each(eventCollection.models, function(index, event){
    if (event.eventID == id) {
      //window.alert(event.eventID);
      //console.log(event);
      event.create();
    }
  });
}

EventModel.prototype.create = function() {
  $.ajax({
    url: '/events',
    method: 'post',
    dataType: 'json',
    data: {event: {name: this.eventName}},
    success: function(data) {
      console.log(data);
    }
  });
}

var eventCollection = new EventCollection();

$(function() {
  //eventCollection = new EventCollection();
  eventCollection.fetch();
});

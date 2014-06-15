

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
      //that.sortByDate();
    }
  });

}



var userEvents = new EventCollection();

$(function () {
  if ($('span')[0].id == "this_is_profile") {
    console.log("profile");
    userEvents.fetchUserEvents();
  }
});


EventView.prototype.renderUserEvents = function() {
  //var $eventLi = $('<li>').text('Start:'+this.model.startDate + '  End:' + this.model.endDate + '  Recur:' + this.model.recurString);
  var $eventLi =$('<li>');
  var $link = $('<a>', {
    //text: 'Start:'+this.model.startDate + '  End:' + this.model.endDate + '  Recur:' + this.model.recurString,
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
    }, 4000);

    //console.log(that.model.eventID);
  }).mouseleave(function() {
    clearTimeout(timer);
  });
  $eventLi.append($link);

  this.el = $eventLi;
  return this;
}

function clickedUserEvent(id) {
  console.log("delete function?");
}

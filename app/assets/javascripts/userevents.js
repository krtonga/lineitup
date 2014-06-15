

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
        $('#user-event-list').append(eventView.render().el);
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

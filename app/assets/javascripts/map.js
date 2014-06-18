function MapBuild(modelsArray){
  handler = Gmaps.build('Google');
  handler.buildMap({ provider: { zoom: 15, center: new google.maps.LatLng(40.7127, -74.00030), mapTypeId: google.maps.MapTypeId.ROADMAP}, internal: {id: 'map'}}, function(){
    markers = handler.addMarkers(createGeoArray(modelsArray));
    handler.bounds.extendWith(markers);
    handler.fitMapToBounds();
  });
}



function createGeoArray(eventArray) {
  geoArray = [];
  $.each(eventArray, function(index, event) {
    var geoObject = {
      "lat": event.latitude,
      "lng": event.longitude,

      "infowindow": event.venueName + ": <strong>" + event.eventName + "</strong>:" +  "<p>Address:" + event.address +  "</p>" + "<a href=" + event.eventUrl + ">More Info</a>" + "<p>" + "Free: <em>" + event.free + "</p>" +  "</em> Dates: " + event.eventDateList + "<p> " + event.webDescription + "</p>" + "<button class=mapbutton type=button value=" + event.eventID +">Save Event</button>"
    }

    geoArray.push(geoObject);
  });

  return geoArray;
}

$(function(){
  $(".mapbutton").on("click", function(){
    console.log("hello");
  });
});


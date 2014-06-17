function MapBuild(){
  handler = Gmaps.build('Google');
  handler.buildMap({ provider: { zoom: 15, center: new google.maps.LatLng(40.7127, -74.00030), mapTypeId: google.maps.MapTypeId.ROADMAP}, internal: {id: 'map'}}, function(){
    markers = handler.addMarkers(createGeoArray(eventCollection.models));
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
      "infowindow": event.venueName + event.eventName
      }
    geoArray.push(geoObject);
  });

  return geoArray;
}

$(function(){

  //MapBuild();
 });


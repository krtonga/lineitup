


function matchDates(event) {
  var start = $('#start_date_for_range').text();
  var end = $('#end_date_for_range').text();
  var range_start = new Date(Date.parse(start));
  var range_end = new Date(Date.parse(end));
  var dateArray = [];
  if (event.eventDateList != undefined) {
    $.each(event.eventDateList, function(index, date) {
      var asDate = new Date(Date.parse(date)+(60*60*4*1000));
      if (asDate >= range_start && asDate <= range_end) {
        dateArray.push(date);
        console.log(dateArray.length);
        console.log(dateArray);
      }
    });
  } else {

  }
  if (dateArray.length > 0) {
    return true;
  } else {
    return false;
  }
}

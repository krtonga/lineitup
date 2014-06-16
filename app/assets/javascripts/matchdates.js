


function matchDates(event) {
  var weekday = new Array(7);
  weekday[0]=  "sun";
  weekday[1] = "mon";
  weekday[2] = "tue";
  weekday[3] = "wed";
  weekday[4] = "thu";
  weekday[5] = "fri";
  weekday[6] = "sat";
  var start = $('#start_date_for_range').text();
  var end = $('#end_date_for_range').text();
  range_start = new Date(Date.parse(start));
  range_end = new Date(Date.parse(end));
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

    for (var d = range_start; d <= range_end; d.setDate(d.getDate() + 1)) {
      console.log(weekday[d.getDay()], d);
      //  need to get start recurring and end recurring as dates, check
    }

  }
  if (dateArray.length > 0) {
    return true;
  } else {
    return false;
  }
}

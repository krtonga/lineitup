


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
  var range_start = new Date(Date.parse(start));
  var range_end = new Date(Date.parse(end));
  var dateArray = [];
  if (event.eventDateList != undefined) {
    dates = event.eventDateList;
    $.each(dates, function(index, date) {
      var asDate = new Date(Date.parse(date)+(60*60*4*1000));
      if (asDate >= range_start && asDate <= range_end) {
        dateArray.push(date);
      }
    });
  } else {
    var recurStart = new Date(Date.parse(event.startDate));
    if (event.endDate == undefined) {
      var recurEnd = new Date(2020, 0, 1);
    } else {
      var recurEnd = new Date(Date.parse(event.endDate));
    }
    for (var day = range_start; day <= range_end; day.setDate(day.getDate() + 1)) {
      if (day >= recurStart && day <= recurEnd) {
        if ($.inArray(weekday[day.getDay()], event.recurString) != -1) {
          dateArray.push(day.toString());
        }
      }
    }

  }
  if (dateArray.length > 0) {
    return true;
  } else {
    return false;
  }
}

function userMatchDates(event) {
  var weekday = new Array(7);
  weekday[0]=  "sun";
  weekday[1] = "mon";
  weekday[2] = "tue";
  weekday[3] = "wed";
  weekday[4] = "thu";
  weekday[5] = "fri";
  weekday[6] = "sat";
  var start = $('#user_start_date').val();
  var end = $('#user_end_date').val();
  var range_start = new Date(Date.parse(start));
  var range_end = new Date(Date.parse(end));
  var dateArray = [];
  recur_array = event.recurString.split(', ');
  if ($.inArray(recur_array[0], weekday) == -1) {
    dates = recur_array;
    $.each(dates, function(index, date) {
      var asDate = new Date(Date.parse(date)+(60*60*4*1000));
      if (asDate >= range_start && asDate <= range_end) {
        dateArray.push(date);
      }
    });
  } else {
    var recurStart = new Date(Date.parse(event.startDate));
    if (event.endDate == undefined) {
      var recurEnd = new Date(2020, 0, 1);
    } else {
      var recurEnd = new Date(Date.parse(event.endDate));
    }
    for (var day = range_start; day <= range_end; day.setDate(day.getDate() + 1)) {
      if (day >= recurStart && day <= recurEnd) {
        if ($.inArray(weekday[day.getDay()], recur_array) != -1) {
          dateArray.push(day.toString());
        }
      }
    }
  }
  if (dateArray.length > 0) {
    return true;
  } else {
    return false;
  }
}



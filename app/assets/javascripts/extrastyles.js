
$(function() {

  $('.intro-pg').on('click', function() {
    console.log("in intro div");
    $('.search-bar').animate({'margin-left':'-2px'},200);
  });


});


function makeResultQuery() {

  console.log($('#filter_string').text());

}

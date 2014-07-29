

function openSearchBar() {
  $('.intro-pg').on('click', function() {
    $('.search-bar').animate({'margin-left':'-2px'},200);
  });
}

function scrollEventDetails() {
  var ei = $(".eventInfo")
  $(window).scroll(function(){
    windowpos = $(window).scrollTop();
    if (windowpos >= 155 && $('#event-list').height() > $('.eventInfo').height()) {
      ei.addClass("fixed");
    } else {
      ei.removeClass("fixed");
    }
  });
}



function setWindowStyle(){
  console.log($(window).width())
  if ($(window).width() < 768 && $(window).width() > 479){
    descriptionbarMED();
  } else if ($(window).width() < 479){
    disabledescriptionbar();
    descriptionbarSMALL();
  } else {
    disabledescriptionbar();
  }
};

function searchbar(){
  $('.search-bar').delay(200).animate({'marginLeft':'-275px'},200);
  $('.tab').on('click', function() {
    if ( $('.search-bar').css('marginLeft') === '-275px' ) {
      $('.search-bar').animate({'marginLeft':'-2px'},200);
    } else {
      $('.search-bar').animate({'marginLeft':'-275px'},200);
  }});
};

function descriptionbarMED(){
    $('.eventInfo').delay(200).animate({'right':'-20px'},200);
    $('.event-details-tab').on('click', function() {
      console.log("clicked desc");
      if ( $('.eventInfo').css('right') === '-440px' ) {
        $('.eventInfo').animate({'right':'-2px'},200);
      } else {
        $('.eventInfo').animate({'right':'-440px'},200);
    }});
};

function descriptionbarSMALL(){
    $('.eventInfo').delay(200).animate({'right':'-20px'},200);
    $('.event-details-tab').on('click', function() {
      console.log("clicked desc");
      if ( $('.eventInfo').css('right') === '-320px' ) {
        $('.eventInfo').animate({'right':'-20px'},200);
      } else {
        $('.eventInfo').animate({'right':'-320px'},200);
    }});
};

function disabledescriptionbar(){
    $('.eventInfo').delay(200).animate({'right':'none'},200);
};








function initSheet() {
  $('#ripper').swipe( {
    swipe:function(event, direction, distance, duration, fingerCount) {
      var el = $(this);
      var newone = el.clone(true);
      el.addClass('tearoff-anim');
      // setTimeout(function() {
      //   el.remove();
      //   $('.tearoff').append(newone);
      // }, 1000);
    },
    threshold:0
  });
}

function sheetDown() {
  $('#ripper').animate({
    bottom: '-=80px'
  }, 'slow', 'easeOutQuad', 
    function(){
      //complete function
    }
  );
}
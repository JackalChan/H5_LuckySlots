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

function sheetDelete() {
  var t = document.getElementsByClassName('tearoff');
  
  var ripper = document.getElementById('ripper');
  var r = document.createElement('div');
  r.setAttribute('id', 'ripper');

  t[0].removeChild(ripper);
  t[0].appendChild(r);

  initSheet();
}
function initSheet() {
  // $('#ripper').swipe( {
  //   swipe:function(event, direction, distance, duration, fingerCount) {
  //     var el = $(this);
  //     var newone = el.clone(true);
  //     el.addClass('tearoff-anim');
  //     playSound('audio-tear');
  //     // setTimeout(function() {
  //     //   el.remove();
  //     //   $('.tearoff').append(newone);
  //     // }, 1000);
  //   },
  //   threshold:0
  // });

  $('#ripper').on('swipe', function(e, Dx, Dy){
    // Dx == 1 means right
    // Dx == -1 means left
    // Dy == 1 means top
    // Dy == -1 means bottom
    switch (Dx) {
      case -1:
        var el = $(this);
        var newone = el.clone(true);
        el.addClass('tearoff-anim');
        playSound('audio-tear');
        break;
      case 1:
        var el = $(this);
        var newone = el.clone(true);
        el.addClass('tearoff-anim');
        playSound('audio-tear');
        break;
    }
  });
}

function sheetDown() {
  $('#ripper').animate({
    top: '+=110px'
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

function initLightbox() {
  var lightbox = document.querySelector('#lightbox');
  lightbox.addEventListener('click', function() {
    this.classList.remove('lightbox-show');
    this.classList.add('lightbox-hide');
  });
}
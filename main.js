var boxs = document.querySelectorAll('.box');
var speed = .3;
var delta = 0;
var scrollStatus = true;
var direction = 1;
var count = (boxs.length - 1) + '00';
// mobile
var initialY = null;
boxs.forEach(function (item) {
  item.addEventListener('wheel', startWheel, false);
  item.addEventListener("touchstart", startTouch, false);
  item.addEventListener("touchmove", moveTouch, false);
});


function startWheel(e) {
  if (scrollStatus) {
    if (e.deltaY > 0 && delta < count) {
      scroll(1);
    } else if (e.deltaY < 0 && delta > 0) {
      scroll(0);
    }
  }
}

function scroll(item) {
  direction = item;
  TweenMax.to('.box', speed, {
    scale: 0.9,
    onStart: function () {
      scrollStatus = false;
    },
    onComplete: startTranslate,
    onCompleteParams: [direction]
  });
}


function startTranslate(direction) {
  if (direction === 1) {
    delta += 100;
  } else {
    delta -= 100;
  }
  TweenMax.to('.box', speed, {
    y: -delta + '%',
    onComplete: endTranslate
  });
}

function endTranslate() {
  TweenMax.to('.box', speed, {
    scale: 1
  });
  setTimeout(function () {
    scrollStatus = true;
  }, 300);
}


// mobile touch

function startTouch(e) {
  initialY = e.touches[0].clientY;
};

function moveTouch(e) {

  if (initialY === null) {
    return;
  }
  var currentY = e.touches[0].clientY;
  var diffY = initialY - currentY;

  if (diffY > 0) {
//up
    if (delta < count && scrollStatus) {
      scroll(1);
    }
  } else {
    //own
    if (delta > 0 && scrollStatus) {
      scroll(0);
    }
  }
  initialY = null;
};
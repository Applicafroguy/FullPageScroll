var delta = 0;
var boxs = document.querySelectorAll('.box');
var blockItems = boxs.length - 1;
var speed = .5;
var scrollStatus = true;
document.addEventListener('wheel', function (e) {

  if(scrollStatus){
   
    if (e.deltaY > 0 && delta < blockItems + '00') {
      scrollUp()
    

    }
     else if (e.deltaY < 0 && delta > 0) {
       scrollDown()
     

    }
  }



}, false);

document.addEventListener("touchstart", startTouch, false);
document.addEventListener("touchmove", moveTouch, false);


var initialY = null;

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
    // swiped up
    if (delta < blockItems + '00' && scrollStatus) {
     scrollUp()
    }
  } else {
    // swiped down
    if (delta > 0 && scrollStatus) {
    scrollDown()
    }
  }

  initialY = null;

};


function scrollUp(){
  TweenMax.to('.box', speed, {
    scale: .9,
    onStart: startZoom,
    onComplete: endZoom
  })
  function startZoom() {

    scrollStatus = false
  }
  function endZoom() {
    delta += 100;
    TweenMax.to('.box', speed, {
      y: -delta + '%',
      onComplete: endTranslate
    })
    setTimeout(function () {
      scrollStatus = true
    }, 1000)

  }
  function endTranslate() {
    TweenMax.to('.box', speed, {
      scale: 1
    })
  }
}

function scrollDown(){
  delta -= 100
  TweenMax.to('.box', speed, {
    scale: .9,
    onStart: startZoom,
    onComplete: endZoom
  })
  function startZoom() {
    scrollStatus = false
  }
  function endZoom() {

    TweenMax.to('.box', speed, {
      y: -delta + '%',
      onComplete: endTranslate
    })
    setTimeout(function () {
      scrollStatus = true
    }, 1000)

  }
  function endTranslate() {
    TweenMax.to('.box', speed, {
      scale: 1
    })
  }
}
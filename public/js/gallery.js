$(document).ready(function () {
  new Splide('.splide').mount();
  var textImg = $('.title');

  var backgrounds = new Array(
    'url(../img/gallery/text-background1.jpg)'
    , 'url(../img/gallery/text-background2.jpg)'
    , 'url(../img/gallery/text-background3.jpg)'
    , 'url(../img/gallery/text-background4.jpg)'
    , 'url(../img/gallery/text-background5.jpg)'
    , 'url(../img/gallery/text-background6.jpg)'
  );

  var current = 0;

  function nextBackground() {
    current++;
    current = current % backgrounds.length;
    textImg.css('background-image', backgrounds[current]);
  }
  setInterval(nextBackground, 1500);

  textImg.css('background-image', backgrounds[0]);
});
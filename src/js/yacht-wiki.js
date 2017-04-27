$(function(){
  $('.yw-det__slider').slick({
     useTransform: true,
     slidesToShow: 1,
     slidesToScroll: 1,
     draggable: false,
     arrows: false,
     fade: true,
     swipe: false,
     asNavFor: '.yw-det__slider-nav',
     cssEase: 'linear'
  });

  $('.yw-det__slider-nav').slick({
     slidesToShow: 4,
     slidesToScroll: 1,
     asNavFor: '.yw-det__slider',
     dots: false,
     focusOnSelect: true,
     infinity: false,
     draggable: false,
     swipe: false,
     margin: 2,
     arrows: false
  });

  $('.js-yw-programm-slider').slick({
     useTransform: true,
     slidesToShow: 1,
     infinite: false,
     slidesToScroll: 1,
     draggable: false,
     fade: true,
     swipe: false,
     cssEase: 'linear',
     prevArrow: $('.yw-p__slider-btn-left'),
     nextArrow: $('.yw-p__slider-btn-right')
  });

  $('.js-yw-programm-slider-flot').slick({
     useTransform: true,
     slidesToShow: 1,
     infinite: false,
     slidesToScroll: 1,
     draggable: false,
     fade: true,
     swipe: false,
     cssEase: 'linear',
     prevArrow: $('.yw-flot__slider-btn-left'),
     nextArrow: $('.yw-flot__slider-btn-right')
  });

  $('.js-thnk-stat').click(function(){
    $('.yw-form-wrap').fadeOut(500);
    $('.popup-thnk').delay(500).fadeIn();
    $('.yw__content').css('height', 'calc(100vh - 120px)');
  })

  $(function($){
   $(".js-phone").mask("(099) 999 99 99", {placeholder: "---------"});
  });

});

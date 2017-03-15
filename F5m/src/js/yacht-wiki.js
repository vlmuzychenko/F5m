$(function(){
  $('.yw-det__slider').slick({
     useTransform: true,
     slidesToShow: 1,
     slidesToScroll: 1,
     draggable: false,
     arrows: false,
     fade: true,
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
     arrows: false
  });

  $('.yw-p__slider').slick({
     useTransform: true,
     slidesToShow: 1,
     infinite: false,
     slidesToScroll: 1,
     draggable: false,
     fade: true,
     cssEase: 'linear',
     prevArrow: $('.yw-p__slider-btn-left'),
     nextArrow: $('.yw-p__slider-btn-right')
  });

  $('.js-thnk').click(function(){
    $('.yw-form-wrap').fadeOut(500);
    $('.yw-thnk').delay(500).fadeIn();
  })
});

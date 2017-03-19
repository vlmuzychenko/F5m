$(function(){
  $('.js-instructors-slider').slick({
     useTransform: true,
     slidesToShow: 1,
     infinite: false,
     slidesToScroll: 1,
     draggable: false,
     fade: true,
     swipe: false,
     cssEase: 'linear',
     prevArrow: $('.instructor__slider-btn-left'),
     nextArrow: $('.instructor__slider-btn-right')
  });

  $('.gallery').slick({
    fade: true,
    infinite: true,
    draggable: false,
    dots: true,
    prevArrow: $('.gallery__slider-btn-left'),
    nextArrow: $('.gallery__slider-btn-right')
  });

  $('.js-select-single').each(function () {
     $(this).multipleSelect({
        width: '100%',
        placeholder: $(this).attr('placeholder'),
        single: true
     });
  });
})

$(document).ready(function(){
  var top_click = true;
  var bottoms_click = true;

  $('.tab-img.top-p img').on('click', function(){
    if (top_click) {
        top_click = false;
        var block = $('.click-img-2 li:first-child').clone();
        block.appendTo('.click-img-2 ');
        $('.click-img-2 li:first-child').css('height', 0);
        setTimeout(removeElem2, 200);
    }
  })

  $('.tab-img.bottom-p img').on('click', function(){
    if (bottoms_click) {
        bottoms_click = false;
        var block = $('.click-img-2 li:last-child').clone();
        block.css('height', 0).prependTo('.click-img-2 ');
        setTimeout(function(){
            $('.click-img-2 li:first-child').css('height', $('.click-img-2 li:first-child').css('max-height'));
        }, 200);
        setTimeout(removeLastElem2, 400);
      }
  })

  function removeElem2(){
    $('.click-img-2 li:first-child').remove();
    top_click = true;
  }

  function removeLastElem2(){
    $('.click-img-2 li:last-child').remove();
    bottoms_click = true;
  }

   $(document).on("click",".slider-child", function(e){
     e.preventDefault();
     $(this).toggleClass('active-2');
  });
})

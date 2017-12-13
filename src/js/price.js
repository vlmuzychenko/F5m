(function(){
  var includedWrap = $('.js-included');
  var extraWrap = $('.js-extra');

  var currentPrice = $('.js-price').find('input:checked');

  var currentText = currentPrice.siblings('label').text();
  var currentInfo = currentPrice.parent().data('price-info');
  var currentIncludedCont = currentInfo.included.split('|');
  var currentExtraCont = currentInfo.extra.split('|');
  // var currentImg = currentInfo.img;
  var currentMulti = $.map(currentInfo.multiprice, function(value){
    return [value];
  });
  var item = $('.yw-price__item');

  includedWrap.html('');
  extraWrap.html('');
  $('.yw-price__value').text(currentText);
  // $('.yw-price__pic').css('background-image', `url(${currentImg})`);
  for(var i = 0; i < currentIncludedCont.length; i++){
    includedWrap.append('<li>'+currentIncludedCont[i]+'</li>');
  }
  for(var i = 0; i < currentExtraCont.length; i++){
    extraWrap.append('<li>'+currentExtraCont[i]+'</li>');
  }
  for(var i = 0; i < item.length; i++){
    var text = currentMulti[i].text;
    var date = currentMulti[i].date;
    var price = currentMulti[i].price;
    var current = currentMulti[i].current;

    $(item[i]).find('.yw-price__item-text').text(text);
    $(item[i]).find('.yw-price__item-date').text(date);
    $(item[i]).find('.yw-price__item-value').text(price);
    if(current == 'y'){
      $(item[i]).addClass('active');
    }
  }

  $('.js-price label').click(function(e){

    var target = $(e.currentTarget);

    var text = target.text();
    var info = target.parent().data('price-info');
    var includedCont = info.included.split('|');
    var extraCont = info.extra.split('|');
    //var img = info.img;
    var multi = $.map(info.multiprice, function(value){
      return [value];
    });
    var item = $('.yw-price__item');

    includedWrap.html('');
    extraWrap.html('');
    $('.yw-price__value').text(text);
    item.each(function(){
      $(this).removeClass('active');
    });
    //$('.yw-price__pic').css('background-image', `url(${img})`);
    for(var i = 0; i < includedCont.length; i++){
      includedWrap.append('<li>'+includedCont[i]+'</li>');
    }
    for(var i = 0; i < extraCont.length; i++){
      extraWrap.append('<li>'+extraCont[i]+'</li>');
    }
    for(var i = 0; i < item.length; i++){
      var text = multi[i].text;
      var date = multi[i].date;
      var price = multi[i].price;
      var current = multi[i].current;

      $(item[i]).find('.yw-price__item-text').text(text);
      $(item[i]).find('.yw-price__item-date').text(date);
      $(item[i]).find('.yw-price__item-value').text(price);
      if(current == 'y'){
        $(item[i]).addClass('active');
      }
    }
  })

})();

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
  item.html('');
  $('.yw-price__value').text(currentText);
  // $('.yw-price__pic').css('background-image', `url(${currentImg})`);
  for(var i = 0; i < currentIncludedCont.length; i++){
    includedWrap.append('<li>'+currentIncludedCont[i]+'</li>');
  }
  for(var i = 0; i < currentExtraCont.length; i++){
    extraWrap.append('<li>'+currentExtraCont[i]+'</li>');
  }
  if(typeof(currentMulti[1]) != 'undefined'){
    for(var i = 0; i < currentMulti.length; i++){
      var text = currentMulti[i].text;
      var date = currentMulti[i].date;
      var price = currentMulti[i].price;
      var current = currentMulti[i].current;

      $(item[i]).append('<div class="yw-price__item-text">' + text + '</div>');
      $(item[i]).append('<div class="yw-price__item-date">' + date + '</div>');
      $(item[i]).append('<div class="yw-price__item-value">' + price + '</div>');
      if(current == 'y'){
        $(item[i]).addClass('active');
      }
    }
  }


  $('.js-price label').click(function(e){
    // var fondy_price = $(this).parents('.js-price').data('fprice');
    // var fondy_title = $(this).parents('.js-price').data('ftitle');
    // var _id = $(this).parents('.js-price').data('id');
    // $('#selected_id').val(_id);
    // $('.filled').text(fondy_price);
    // $('select.select-product option:selected').attr('data-id',_id).attr('value',fondy_price).text(fondy_title);
    // $('div.select-product button>span').text(fondy_title);
    // calculateFondySum();

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
    item.html('');
    $('.yw-price__value').text(text);
    item.each(function(){
      $(this).removeClass('active show-before');
    });
    //$('.yw-price__pic').css('background-image', `url(${img})`);
    for(var i = 0; i < includedCont.length; i++){
      includedWrap.append('<li>'+includedCont[i]+'</li>');
    }
    for(var i = 0; i < extraCont.length; i++){
      extraWrap.append('<li>'+extraCont[i]+'</li>');
    }
    if(typeof(multi[1]) != 'undefined'){
      for(var i = 0; i < item.length; i++){
        var text = multi[i].text;
        var date = multi[i].date;
        var price = multi[i].price;
        var current = multi[i].current;

        $(item[i]).addClass('show-before');

        $(item[i]).append('<div class="yw-price__item-text">' + text + '</div>');
        $(item[i]).append('<div class="yw-price__item-date">' + date + '</div>');
        $(item[i]).append('<div class="yw-price__item-value">' + price + '</div>');
        if(current == 'y'){
          $(item[i]).addClass('active');
        }
      }
    }

  })

})();

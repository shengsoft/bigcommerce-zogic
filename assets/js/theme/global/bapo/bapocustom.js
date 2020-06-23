/* eslint-disable */

export default function () {

  // active state - clean guide
  $('.sidebar-navigation ul li').on('click', function(){
    $('.sidebar-navigation ul li.active').removeClass('active');
    $(this).addClass('active');
  });


  $('a[href*="#"]').on('click', function(e) {
    //Only run this on the clean guide page otherwise this breaks all links
    if ($('.page.landing-page').length > 0) {
        
      e.preventDefault()
    
      $('html, body').animate(
        {
          scrollTop: $($(this).attr('href')).offset().top - 100,
        },
        500,
        'linear'
      )
    }
  })

  $('.cart-list .cart-item-name a').each(function () {
    let text = $(this).text();
    let textLength = text.length;
    if (textLength >= 45) {
      let newText = text.slice(0, 45);
      $(this).text(newText).append(`<span>...</span>`);
    }
  });

  if ($('.product-page-crumbs').length == 1) {
    $('.product-page-crumbs .breadcrumb').each(function () {
      let lastCrumb = $(this).find('.breadcrumb.is-active');
      let brandCrumb = $('.productView-brand a').text();
      let listnumber = $('.breadcrumb').length

      if ($('.productView-brand a').length === 1 && $(this).hasClass('is-active')) {
        $(this).prepend(`<li class="breadcrumb added-breadcrumb">
                <i class="material-icons">arrow_right</i>
                <a href="/brands/${brandCrumb}" class="breadcrumb-label">
                  <span>
                    ${brandCrumb}
                  </span>
                </a>
              </li>`);
      }
    });
  }
  $('select').change(function (e) {
    var optionSelected = $("option:selected", this);
    if (optionSelected.hasClass("recurring")) {
      $(".Yes").click();
    }
    else {
      $(".No").click();
    }
  });
  $('.product-option-popup .details-link').on('click', function () {
    $.magnificPopup.open({
      items: { src: '#autoship-popup' },
      type: 'inline',
      closeOnBgClick: true,
    }, 0);
  });
  
  // sticky sidebar for landing page - clean guide 
  
  $(window).scroll(function(){
    if ($('.page.landing-page').length > 0) {
      var sticky = $('.sidebar-navigation'),
          scroll = $(window).scrollTop();
    
      if ($('.sidebar-navigation').position().bottom >= $('.newsletter-subscription').position().top){
        //
        sticky.removeClass('fixed'); 
      } 
      else{
        //Only if we still use the sticky sidebar
        if (scroll <= 900) sticky.removeClass('fixed');    
        if (scroll >= 900) sticky.addClass('fixed');
        if (scroll >= $('.newsletter-subscription').position().top - 515) sticky.removeClass('fixed'); 
        var id;
        //TODO CREATE NEW CLASS TO MARK SCROLL TO SECTIONS AND REPLACE SELECTOR
        $('.scroll-section').each(function( index ) {
          //console.log( index + ": " + $( this ).position().top );
          if (scroll + 100 >= $( this ).position().top){
            id = this.id;
          }
        });
        
        $('.sidebar-navigation ul li.active').removeClass('active');
        //console.log('.sidebar-navigation ul li [href="#' + id + '"]');
        $('.sidebar-navigation ul li [href="#' + id + '"]').parent().addClass('active');
      }
    }
  });

}

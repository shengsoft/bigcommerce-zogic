import $ from 'jquery';

export default function() {

   function doSticky() {
      const $headerHeight = $('header.header').outerHeight();
      const $navigationHeight = $('.navPages-container').outerHeight();

      $(window).scroll(function() {
         const scrollTop = $(this).scrollTop();
         if (scrollTop > $headerHeight) {
            $('body').addClass('is-sticky');
            $('body.is-sticky .body').css('margin-top', $headerHeight);

            if ($('.quickSearchResultsWrap').hasClass('hasResults')) {
               $('.is-sticky #quickSearch').addClass('is-open');
            }
         } else {
            $('body').removeClass('is-sticky');
            $('body .body').css('margin-top', '0px');
            $('#quickSearch').remove('is-open');
         }
      });
   }
   if ($(window).width() >= 992) {
      doSticky();
   }
   $(window).resize(function() {
      if ($(window).width() >= 992) {
         doSticky();
      }
   });
}

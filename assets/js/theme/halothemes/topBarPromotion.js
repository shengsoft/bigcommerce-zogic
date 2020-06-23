import $ from 'jquery';
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
export default function() {
   const eventtype = $.browser.mobile ? 'touchstart' : 'click';

   $('#top-bar-promotion').removeClass('hide').addClass('animated fadeIn');

   $('#top-bar-promotion a.close').on(eventtype, function() {
      $('#top-bar-promotion').addClass('hide');
   });
}

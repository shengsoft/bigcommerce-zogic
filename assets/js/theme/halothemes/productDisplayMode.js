import $ from 'jquery';

export default function() {
   // Product List
   $('#list-view').click(function() {
      $('#product-listing-container form > .module-wrapper').addClass('productList');

      $(this).attr('class', 'current-view');
      $('#grid-view').removeClass('current-view');

      $('#product-listing-container form > .module-wrapper.productList .prod-item').each(function(index, el) {
         if ($(this).find('.btn-compare').length > 0) {
            $(this).find('.btn-compare').appendTo($(this).find('.prod-desc'));
         }
      });

   });

   // Product Grid
   $('#grid-view').click(function() {
      $('#product-listing-container form > .module-wrapper').removeClass('productList');

      $(this).attr('class', 'current-view');
      $('#list-view').removeClass('current-view');

   });
}

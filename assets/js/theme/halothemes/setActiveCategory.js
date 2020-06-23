import $ from 'jquery';

export default function() {
   $('ul.all-categories-list li').each(function() {
      const breadLink = $('.page-type-product #breadcrumbs-wrapper ul li.breadcrumb.is-active').prev('.breadcrumb').children('a').attr('href');
      if (($(this).children('a').attr('href') == window.location) || ($(this).children('a').attr('href') == window.location.pathname)) {
         $(this).addClass('current-cat');
         $(this).children('.dropdown-category-list').addClass('cat-expanded').siblings('i.fa.fa-chevron-up').addClass('is-clicked');
         $(this).parents('.dropdown-category-list').addClass('cat-expanded').siblings('i.fa.fa-chevron-up').addClass('is-clicked');
      }
      if ($(this).children('a').attr('href') == breadLink) {
         $(this).addClass('current-cat');
         $(this).parents('.dropdown-category-list').addClass('cat-expanded').siblings('i.fa.fa-chevron-up').addClass('is-clicked');
         
      }
   });

   $('ul.all-categories-list i.fa.fa-chevron-up').click(function() {
      /* Act on the event */
      $(this).toggleClass('is-clicked');
      $(this).siblings('ul.dropdown-category-list').toggleClass('cat-expanded');
      $(this).siblings('.navPage-subMenu-action').toggleClass('selected');
   });
   
}

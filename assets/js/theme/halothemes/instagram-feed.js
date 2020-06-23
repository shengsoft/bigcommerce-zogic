import $ from 'jquery';
import Instafeed from 'instafeed.js';

export default function() {
   const feed = new Instafeed({
      get: 'user',
      userId: $('#instafeed').data('userid'),
      accessToken: $('#instafeed').data('accesstoken'),
      resolution: 'standard_resolution',
      limit: '20',
      template: '<div class="feed-item-wrap animated fadeIn">\
                  <div class="feed-item"><img src="{{image}}" />\
                     <div class="feed-action">\
                        <a data-toggle="tooltip" title="View Detail" target="_blank" class="btn btn-primary" href="{{link}}"><i class="fa fa-link"></i></a>\
                        <a data-toggle="tooltip" title="Quick View" class="btn btn-primary btn-quickview" data-mfp-src="{{image}}" feed-caption="{{caption}}"><i class="fa fa-photo"></i></a>\
                     </div>\
                  </div>\
               </div>',
      before: function(){
         $('#instafeed').after('<div class="before-loading text-center"><i class="fa fa-spinner fa-spin fa-3x fa-fw"></i></div>') ;
      },
      after: function() {
         $('#instafeed ~ .before-loading').remove();
         $('#instafeed a').attr('target', '_blank');
         $('#instafeed').owlCarousel({
            nav: true,
            dots: false,
            items: 6,
            margin: 30,
            slideBy: 5,
            responsive: {
               0: {
                  items: 2,
                  slideBy: 2
               },
               420: {
                  items: 2,
                  slideBy: 2
               },
               560: {
                  items: 3,
                  slideBy: 3
               },
               768: {
                  items: 4,
                  slideBy: 4
               },
               992: {
                  items: 4,
                  slideBy: 4
               },
               1200: {
                  items: 6,
                  slideBy: 6
               }
            },
            responsiveRefreshRate: 0
         });
      }
   });
   feed.run();

   $('#instafeed').each(function() { // the containers for all your galleries
      $(this).magnificPopup({
         delegate: 'a.btn-quickview', // the selector for gallery item
         type: 'image',
         mainClass: 'mfp-fade mfp-instagram',
         gallery: {
            enabled: true
         },
         image: {
            titleSrc: function(item) {
               return item.el.attr('feed-caption');
            }
         }
      });
   });
}

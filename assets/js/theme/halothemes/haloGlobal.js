import $ from 'jquery';
import classie from 'classie';
import utils from '@bigcommerce/stencil-utils';

export default function() {
    var is_mobile = false;
      var width_menu = 0;
      if ($(window).width() < 1023) {
        is_mobile = true;
      }
      else{
        is_mobile = false;
      }

    jQuery(document).ready(function($) {

        // OwlCarousel init
        const $carousel = $('[data-owl]');
        if ($carousel.length) {
            $carousel.each(function(index, el) {
                $(this).owlCarousel($(this).data('owl'));
            });

        }

        // Set Active Side All Pages
        $('ul.all-pages-list li').each(function() {
            if (($(this).children('a').attr('href') == window.location) || ($(this).children('a').attr('href') == window.location.pathname)) {
                $(this).addClass('current-cat');
            }
       });

        // Featured Categories on Megamenu
        if ($('.featured-categories .owl-carousel').length > 0) {
            $('.featured-categories .owl-carousel').owlCarousel({
                items: 1,
                slideBy: 1,
                margin: 20,
                nav: true,
                dots: false,
                responsive: {
                    0: {
                        items: 1,
                        slideBy: 1
                    },
                    992: {
                        items: 1,
                        slideBy: 1
                    }
                },
                responsiveRefreshRate: 0
            });
        }

        // SideBar Toggle Mobile View
        if ($('#sidebar-toggle').length) {
            $('#sidebar-toggle a').click(function() {
                if ($(this).find('i').hasClass('fa-plus')) {
                    $('.page-sidebar > nav').fadeIn(200);
                    if ($('.page-sidebar > nav').length) {
                        $(window).scrollTop($(this).offset().top - 15);
                    }
                    $('#sidebar-toggle a span.btn-sidebar-toggle').html('<i class="fa fa-minus"></i>');
                } else if ($(this).find('i').hasClass('fa-minus')) {
                    if ($('.page-sidebar > nav').length) {
                        $('.page-sidebar > nav').fadeOut(200);
                    }
                    $('#sidebar-toggle a span.btn-sidebar-toggle').html('<i class="fa fa-plus"></i>');
                }
            });
        }

         $(".prod-name > a").each(function() {
            var product = jQuery(this);
            var proId = product.attr('data-product-id');
            var url = '/products.php?productId=' + proId;
                var link = product.attr("href");
            if(proId){
              utils.api.product.getById(proId, { template: 'halothemes/free-shipping' }, (err, response) => {       
                if($(response).find('.productView-info-value').hasClass('hl_shipping_free')){
                 // var free_shipping = jQuery(response).find(".hl_shipping_free").text();          
                  product.parent().parent().parent().find(".prod-image").append("<p class='free_shipping'><span>Free</span> Shipping!</p>");
                }
              });         
            }    
          });

        // Mobile Menu Links
        $('#mobile-categories > ul').css('max-height', screen.height);
        $('#mobile-customer > ul').css('max-height', screen.height);
        $(window).resize(function(event) {
            /* Act on the event */
            $('#mobile-categories > ul').css('max-height', screen.height);
            $('#mobile-customer > ul').css('max-height', screen.height);
        });

        $('#mobile-customer ul li > span').click(function() {
            if ($(this).hasClass('toggle-expand')) {
                $(this).siblings('div').addClass('sub-expand');
                $(this).parent().addClass('expanded');
                $(this).attr('class', 'toggle-close');
            } else if ($(this).hasClass('toggle-close')) {
                $(this).siblings('div').removeClass('sub-expand');
                $(this).parent().removeClass('expanded');
                $(this).attr('class', 'toggle-expand');
            }
        });

        // Mobile Search Toggle Button
        $('.mobile-search-toggle').click(function(event) {
            /* Act on the event */
            $('header.header').toggleClass('mobile-search-is-open');
        });  

    });

    $(window).resize(function() {
        if ($(window).width() >= 992) {
            $('body').removeClass('st-off-canvas');
            $('#st-container').removeClass('st-effect-1 st-menu-open');
                       
        }
        if (width_menu >= $('.header-bottom >div.container').width()) {
            $('.header-bottom').addClass('active');        
          }else{
              $('.header-bottom').removeClass('active');
          };
        
    });
    $('.header-bottom >div.container > .list-top li').each(function(){
        width_menu += $(this).width();        
      });
      width_menu = width_menu - $('.showMore').width();

      if (width_menu >= $('.header-bottom >div.container').width()) {
        $('.header-bottom').addClass('active');        
      }else{
          $('.header-bottom').removeClass('active');
    };
      $('.showMore').click(function() {
          $('.header-bottom').toggleClass('is-open');
      });


    if ($(window).width() >= 992) {
        $('.sidebarBlock.sidebarEffects-window .accordion-navigation-actions').toggle();
        $('.sidebarBlock.sidebarEffects-window .accordion-navigation').toggleClass('is-open');
        $('.sidebarBlock.sidebarEffects-window .accordion-content').toggleClass('is-open');
    };
    if ($(window).width() <= 992) {
        $('.page-type-blog .sidebarBlock.sidebarEffects-window .accordion-navigation-actions').show();
        $('.page-type-blog .accordion-navigation').click(function() {
            $('.page-type-blog .sidebarBlock.sidebarEffects-window .accordion-navigation').toggleClass('is-open');
            $('.page-type-blog .sidebarBlock.sidebarEffects-window .accordion-content').toggleClass('is-open');
        });
    };


     

    if ($(window).width() <= 992) {
        if ($('#MostSearched ul').height() > 90 ) {
            $('#MostSearched ul').addClass('active');
         }else{
            $('#MostSearched ul').removeClass('active');
         };
         $('.showMore-footer').click(function() {
            $('#MostSearched ul').toggleClass('is-open');
         });
    };

    /**
     * sidebarEffects.js v1.0.0
     * http://www.codrops.com
     *
     * Licensed under the MIT license.
     * http://www.opensource.org/licenses/mit-license.php
     *
     * Copyright 2013, Codrops
     * http://www.codrops.com
     */

    const SidebarMenuEffects = (function() {
        function hasParentClass(e, classname) {
            if (e === document) return false;
            if (classie.has(e, classname)) {
                return true;
            }
            return e.parentNode && hasParentClass(e.parentNode, classname);
        }

        function init() {
            const container = document.getElementById('st-container');
            const buttons = Array.prototype.slice.call(document.querySelectorAll('#st-trigger-effects > a'));
            const buttonClose = Array.prototype.slice.call(document.querySelectorAll('.close-canvas'));
            const buttonsMS = Array.prototype.slice.call(document.querySelectorAll('#mobileSearchSidebar > a'));
            const buttonsAlt = Array.prototype.slice.call(document.querySelectorAll('li#mobileAccountSidebar > a'));
            // event type (if mobile use touch events)
            const eventtype = $.browser.mobile ? 'touchstart' : 'click';
            const resetMenu = function() {
                classie.remove(container, 'st-menu-open');
                $('body').removeClass('st-off-canvas');
            };
            const bodyClickFn = function(evt) {
                // if( hasParentClass( evt.target, 'close-canvas' ) ) {
                if (!hasParentClass(evt.target, 'st-menu')) {
                    resetMenu();
                    document.removeEventListener(eventtype, bodyClickFn);
                }
            };

            // toggle categories
            buttons.forEach(function(el, i) {
                const effect = el.getAttribute('data-effect');

                el.addEventListener(eventtype, function(ev) {
                    ev.stopPropagation();
                    ev.preventDefault();
                    container.className = 'st-container'; // clear
                    classie.add(container, effect);
                    $(window).scrollTop(0);
                    setTimeout(function() {
                        classie.add(container, 'st-menu-open');
                        $('body').addClass('st-off-canvas');
                    }, 25);
                    document.addEventListener(eventtype, bodyClickFn);
                });
            });

            buttonClose.forEach(function(el, i) {
                const effect = el.getAttribute('data-effect');

                el.addEventListener(eventtype, function(ev) {
                    ev.stopPropagation();
                    ev.preventDefault();
                    container.className = 'st-container'; // clear
                    classie.remove(container, effect);
                    $(window).scrollTop(0);
                    setTimeout(function() {
                        classie.remove(container, 'st-menu-open');
                        $('body').removeClass('st-off-canvas');
                    }, 25);
                    document.addEventListener(eventtype, bodyClickFn);
                });
            });

            // search categories
            buttonsMS.forEach(function(el, i) {
                const effect = el.getAttribute('data-effect');

                el.addEventListener(eventtype, function(ev) {
                    ev.stopPropagation();
                    ev.preventDefault();
                    container.className = 'st-container'; // clear
                    classie.add(container, effect);
                    $(window).scrollTop(0);
                    setTimeout(function() {
                        classie.add(container, 'st-menu-open');
                        $('body').addClass('st-off-canvas');
                    }, 25);
                    document.addEventListener(eventtype, bodyClickFn);
                });
            });

            // toggle account
            buttonsAlt.forEach(function(el, i) {
                const effect = el.getAttribute('data-effect');

                el.addEventListener(eventtype, function(ev) {
                    ev.stopPropagation();
                    ev.preventDefault();
                    container.className = 'st-container'; // clear
                    classie.add(container, effect);
                    $(window).scrollTop(0);
                    setTimeout(function() {
                        classie.add(container, 'st-menu-open');
                        $('body').addClass('st-off-canvas');
                    }, 25);
                    document.addEventListener(eventtype, bodyClickFn);
                });
            });
        }

        init();
    })();

}

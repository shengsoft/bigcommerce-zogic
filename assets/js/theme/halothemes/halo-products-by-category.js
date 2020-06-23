import $ from 'jquery';
import utils from '@bigcommerce/stencil-utils';

export default function() {

    $('section[data-prod-by-cat-name]').each(function(index, el) {
        const $prodLoading = $('<div class="loadingOverlay"></div>');
        const $thisCategory = $(this);
        const $thisProducts = $(this).children('.category-products');
        const $catUrl = $(this).data('prod-by-cat-url');
        
        const options = {
            template: 'halothemes/halo-products-by-category-item',
        };
        const cate_options = {
            template: 'halothemes/halo-products-by-category-desc',
        };

        $thisProducts.prepend($prodLoading.show());

        utils.api.getPage($catUrl, cate_options, (err, response) => {
            $thisCategory.find('.category-title').find('.desc-textCate').append(response);
        });
        if ($(this).parent().hasClass('warpBlockBanner')) {
            utils.api.getPage($catUrl, options, (err, response) => {
                $thisProducts.children('.owl-carousel').html(response);

                $thisProducts.children('.owl-carousel').owlCarousel({
                    nav: true,
                    dots: true,
                    items: 5,
                    margin: 30,
                    slideBy: 5,
                    responsive: {
                        0: {
                            items: 2,
                            slideBy: 2
                        },
                        480: {
                            items: 2,
                            slideBy: 2
                        },
                        599: {
                            items: 2,
                            slideBy: 2
                        },
                        601: {
                            items: 1,
                            slideBy: 1
                        },
                        767: {
                            items: 2,
                            slideBy: 2
                        },
                        992: {
                            items: 2,
                            slideBy: 2
                        },
                        993: {
                            items: 1,
                            slideBy: 1
                        },
                        1120: {
                            items: 1,
                            slideBy: 1
                        },
                        1121: {
                            items: 2,
                            slideBy: 2
                        },
                        1340: {
                            items: 3,
                            slideBy: 3
                        },
                        1610: {
                            items: 4,
                            slideBy: 4
                        },
                        1850: {
                            items: 5,
                            slideBy: 5
                        }
                    },
                    responsiveRefreshRate: 0
                });
                $thisProducts.find('.loadingOverlay').hide();

            });
        } else {
            utils.api.getPage($catUrl, options, (err, response) => {
                $thisProducts.children('.owl-carousel').html(response);

                $thisProducts.children('.owl-carousel').owlCarousel({
                    nav: true,
                    dots: true,
                    items: 6,
                    margin: 30,
                    slideBy: 6,
                    responsive: {
                        0: {
                            items: 2,
                            slideBy: 2
                        },
                        480: {
                            items: 2,
                            slideBy: 2
                        },
                        599: {
                            items: 2,
                            slideBy: 2
                        },
                        601: {
                            items: 2,
                            slideBy: 2
                        },
                        767: {
                            items: 3,
                            slideBy: 3
                        },
                        1120: {
                            items: 3,
                            slideBy: 3
                        },
                        1340: {
                            items: 4,
                            slideBy: 4
                        },
                        1610: {
                            items: 5,
                            slideBy: 5
                        },
                        1850: {
                            items: 6,
                            slideBy: 6
                        }
                    },
                    responsiveRefreshRate: 0
                });
                $thisProducts.find('.loadingOverlay').hide();

            });
        }

    });
    
}

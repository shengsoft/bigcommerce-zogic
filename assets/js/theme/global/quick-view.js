import $ from 'jquery';
import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.dropdown';
import utils from '@bigcommerce/stencil-utils';
import ProductDetails from '../common/product-details';
import { defaultModal } from './modal';


export default function (context) {
    const modal = defaultModal();

    $('body').on('click', '.quickview', (event) => {
        event.preventDefault();

        const productId = $(event.currentTarget).data('product-id');

        modal.open({ size: 'large' });

        utils.api.product.getById(productId, { template: 'products/quick-view' }, (err, response) => {
            modal.updateContent(response);

            modal.$content.find('.productView').addClass('productView--quickView');

            const thumbnailCarousel = modal.$content.find('.productView-thumbnails');
            thumbnailCarousel.owlCarousel(thumbnailCarousel.data('owl'));

            modal.$content.find('.productView-thumbnail').each(function(index, el) {
                if ($(this).children('a').data('image-gallery-zoom-image-url') == modal.$content.find('.productView-image').data('zoom-image') ){
                    $(this).children('a').addClass('is-active');
                }
            });

            thumbnailCarousel.trigger('to.owl.carousel', [modal.$content.find('.productView-thumbnail-link.is-active').parents('.owl-item').index(), 200]);

            // new label show on quick view product
            var arrNewProducts = [];
            $.ajax({
                url: '/rss.php?type=atom',
                type: 'GET',
                dataType: 'xml',
                success: function(xml) {
                    $(xml).find('entry').each(function(index, el) {
                        arrNewProducts.push($(this).children('link').attr('href'));
                    });

                    if (modal.$content.find('.productView-images').length > 0) {
                        for (var i = 0; i < arrNewProducts.length; i++) {

                            if (arrNewProducts[i].indexOf(modal.$content.find('.productView-title').data('product-view-url')) > 0) {
                                modal.$content.find('.badges-container').prepend('<div class="new-badge">NEW</div>');
                            }
                        }
                    }
                }
            });

            return new ProductDetails(modal.$content.find('.quickView'), context);
        });
    });
}

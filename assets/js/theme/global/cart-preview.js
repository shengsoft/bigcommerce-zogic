import $ from 'jquery';
import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.dropdown';
import utils from '@bigcommerce/stencil-utils';
import ShippingEstimator from '../halothemes/shipping-estimator';
/* eslint-disable func-names */
/* eslint space-before-function-paren: ["error", "never"] */
/* eslint-disable prefer-arrow-callback */

export default function() {
    const loadingClass = 'is-loading';
    const $cart = $('[data-cart-preview]');
    const $cartDropdown = $('#cart-preview-dropdown .cart-preview-inner');
    const $cartLoading = $('<div class="loadingOverlay"></div>');

    $('body').on('cart-quantity-update', (event, quantity) => {
        $('.cart-quantity')
            .text(quantity)
            .toggleClass('countPill--positive', quantity > 0);
    });

    const eventtype = $.browser.mobile ? 'touchstart' : 'click';
    $cart.on(eventtype, function(ev) {
        ev.preventDefault();
        const options = {
            template: 'common/cart-preview',
        };
        $(this).parent().toggleClass('is-open');

        $cartDropdown
            .addClass(loadingClass)
            .html($cartLoading);
        $cartLoading
            .show();

        utils.api.cart.getContent(options, (err, response) => {
            if (response.search('previewCart-emptyBody') > 0) {
                $('#cart-preview-dropdown .triangle-with-shadow').removeClass('triangle-grey');
            } else {
                $('#cart-preview-dropdown .triangle-with-shadow').addClass('triangle-grey');
            }

            $cartDropdown
                .removeClass(loadingClass)
                .html(response);
            $cartLoading
                .hide();

            const $previewCartList = $('.previewCartList');
            $previewCartList.mCustomScrollbar('destroy');
            if ($previewCartList.length) {
                $previewCartList.mCustomScrollbar({
                    scrollInertia: 400,
                });
            }
            var shippingEstimator = new ShippingEstimator($cartDropdown, $('[data-shipping-estimator]'));
        });
    });

    function refreshContent() {
        if($('body').hasClass('page-type-cart')){
            return window.location.reload();
        }
        else{
            const options = {
                template: 'common/cart-preview',
            };
            
            $cartDropdown
                // .addClass(loadingClass)
                .html($cartLoading);
            $cartLoading
                .show();

            utils.api.cart.getContent(options, (err, response) => {
                if (response.search('previewCart-emptyBody') > 0) {
                    $('#cart-preview-dropdown .triangle-with-shadow').removeClass('triangle-grey');
                } else {
                    $('#cart-preview-dropdown .triangle-with-shadow').addClass('triangle-grey');
                }

                const quantity = $(response).attr('data-cart-quantity') || 0;
                $('body').trigger('cart-quantity-update', quantity);

                $cartDropdown
                    .removeClass(loadingClass)
                    .html(response);
                $cartLoading
                    .hide();

                const $previewCartList = $('.previewCartList');
                $previewCartList.mCustomScrollbar('destroy');
                if ($previewCartList.length) {
                    $previewCartList.mCustomScrollbar({
                        scrollInertia: 400,
                    });
                }
                var shippingEstimator = new ShippingEstimator($cartDropdown, $('[data-shipping-estimator]'));
            });
        }
    }

    $(document).on('click','.previewCart .cart-remove', (event) => {
        const itemId = $(event.currentTarget).data('cart-itemid');

        const openTime = new Date();
        const result = confirm($(event.currentTarget).data('confirm-delete'));

        const delta = new Date() - openTime;
        event.preventDefault();

        // // Delta workaround for Chrome's "prevent popup"
        if (!result && delta > 10) {
            return;
        }
        // // remove item from cart
        cartRemoveItem(itemId);
    });

    function cartRemoveItem(itemId) {
        utils.api.cart.itemRemove(itemId, (err, response) => {
            if (response.data.status === 'succeed') {
                refreshContent();
            } else {
                alert(response.data.errors.join('\n'));
            }
        });
    }

    // cart update
    $(document).on('click','[data-cart-update]', (event) => {
        const $target = $(event.currentTarget);
        event.preventDefault();
        // update cart quantity
        cartUpdate($target);
    });

    function cartUpdate($target) {
        const itemId = $target.data('cart-itemid');
        const $el = $(`#qty-${itemId}`);
        const oldQty = parseInt($el.val(), 10);
        const maxQty = parseInt($el.data('quantity-max'), 10);
        const minQty = parseInt($el.data('quantity-min'), 10);
        const minError = $el.data('quantity-min-error');
        const maxError = $el.data('quantity-max-error');
        const newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1;

        // // Does not quality for min/max quantity
        if (newQty < minQty) {
            return alert(minError);
        } else if (newQty > maxQty) {
            return alert(maxError);
        }
        utils.api.cart.itemUpdate(itemId, newQty, (err, response) => {
            if (response.data.status === 'succeed') {
                // if the quantity is changed "1" from "0", we have to remove the row.
                const remove = (newQty === 0);
                refreshContent();
            } else {
                $el.val(oldQty);
                alert(response.data.errors.join('\n'));
            }
        });
    }

    $(document).on(eventtype, function(ev) {
        if ($(ev.target).closest('#top-cart').length === 0) {
            $cart.parent().removeClass('is-open');
        }
    });
}

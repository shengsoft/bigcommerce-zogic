/* eslint-disable */
import magnificPopup from 'magnific-popup';
import { api } from '@bigcommerce/stencil-utils';

export default function () {
    const url = '/free-shipping-manager/'
    let freeshipping_type;

    if ( $('.freeShipping-section').length) {
        freeshipping_type = $('.freeShipping-section').attr('class').replace('freeShipping-section', '').trim();
    } else {
        freeshipping_type = $('.freeShipping-right').data('shippingType');
    }

    api.getPage(url, {}, (err, content) => {
        const $html = $(content).find('.page-content');
        const modal_heading = $html.find(`.freeShipping-modal .${freeshipping_type} .heading`).text();
        const modal_msg = $html.find(`.freeShipping-modal .${freeshipping_type} .message`).text();
        const sidebar_msg = $html.find(`.freeShipping-description .${freeshipping_type}`).text();
        const freeshipping_heading = $html.find(`.freeShipping-description .${freeshipping_type}-heading`).text();
        
        $('#freeShipping-popup h2').text(modal_heading);
        $('#freeShipping-popup .message').text(modal_msg);
        $('.freeShipping-right .message').text(sidebar_msg);
        $('.freeShipping-section .freeShipping-title, .freeShipping-right .freeShipping-title').text(freeshipping_heading);
    });

    $('.freeShipping-section .details-link, .freeShipping-right .details-link').on('click', function() {
        $.magnificPopup.open({
            items: { src: '#freeShipping-popup' },
            type: 'inline',
            closeOnBgClick: true,
        }, 0);
    });
}

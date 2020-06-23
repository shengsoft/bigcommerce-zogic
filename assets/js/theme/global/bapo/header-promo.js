/* eslint-disable */
import { api } from '@bigcommerce/stencil-utils';

export default function () {
    const url = '/free-shipping-manager/';

    api.getPage(url, {}, (err, content) => {
        const $html = $(content).find('.page-content');
        const $promos = $html.find('.header-promo .row');
        const promo_content = [];

        $promos.each(function(i) {
            if ($(this).find('.promo-number').text().trim() !== '') {
                promo_content.push({
                    text: $(this).find(`.promo-text`),
                    img: $(this).find(`.promo-img`)
                });
            }
        });

        if (promo_content.length < 1) {
            $('.header-top-middle.mobile').hide();
        } else {
            populatePromos(promo_content);
        }
    });

    function populatePromos(promo_content) {
        let count = 0;

        appendPromo(promo_content, count);

        let interval = setInterval(() => {
            count++;

            if (count == promo_content.length ) {
                count = 0;
            }

            appendPromo(promo_content, count);

        }, 7000);
    }

    function appendPromo(promo_content, count) {
        let $promo_text = promo_content[count].text.hide();
        let $promo_img = promo_content[count].img.hide();

        $('.header-top-middle .promos').empty();
        $('.header-top-middle .promos').append($promo_img);
        $('.header-top-middle .promos').append($promo_text);

        $('.header-top-middle .promos .promo-img, .header-top-middle .promos .promo-text').fadeIn(1000)

        setTimeout(() => {
            $('.header-top-middle .promos .promo-img, .header-top-middle .promos .promo-text').fadeOut(1000);
        }, 6000);
    }
}

import $ from 'jquery';
import 'slick-carousel/slick/slick';
import youtubeCarouselFactory from '../halothemes/haloVideo';

export default function () {
    const $carousel = $('[data-slick]');

    if ($carousel.length) {
    	youtubeCarouselFactory($carousel);
        $carousel.slick();
    }
}

import $ from 'jquery';
import 'jquery-zoom';
import _ from 'lodash';

export default class ImageGallery {

    constructor($gallery) {
        this.$mainImage = $gallery.find('[data-image-gallery-main]');
        this.$selectableImages = $gallery.find('[data-image-gallery-item]');
        this.currentImage = {};
    }

    init() {
        this.bindEvents();
        this.setImageZoom();

        $('.productView:not(".productView--quickView") .productView-thumbnail').each(function(index, el) {
            if ($(this).children('a').data('image-gallery-zoom-image-url') == $('.productView-image').data('zoom-image') ){
                $(this).children('a').addClass('is-active');
            }
        });

        $('.productView:not(".productView--quickView") .productView-thumbnails').trigger('to.owl.carousel', [$('.productView:not(".productView--quickView") .productView-thumbnail-link.is-active').parents('.owl-item').index(), 200]);
    }

    setMainImage(imgObj) {
        this.currentImage = _.clone(imgObj);

        this.destroyImageZoom();
        this.setActiveThumb();
        this.swapMainImage();
        this.setImageZoom();
    }

    setAlternateImage(imgObj) {
        if (!this.savedImage) {
            this.savedImage = {
                mainImageUrl: this.$mainImage.find('img').attr('src'),
                zoomImageUrl: this.$mainImage.attr('data-zoom-image'),
                $selectedThumb: this.currentImage.$selectedThumb,
            };
        }
        this.setMainImage(imgObj);
    }

    restoreImage() {
        if (this.savedImage) {
            this.setMainImage(this.savedImage);
            delete this.savedImage;
        }
    }

    selectNewImage(e) {
        e.preventDefault();

        const $target = $(e.currentTarget);
        const imgObj = {
            mainImageUrl: $target.attr('data-image-gallery-new-image-url'),
            zoomImageUrl: $target.attr('data-image-gallery-zoom-image-url'),
            $selectedThumb: $target,
        };

        this.setMainImage(imgObj);
    }

    setActiveThumb() {
        this.$selectableImages.removeClass('is-active');
        if (this.currentImage.$selectedThumb) {
            this.currentImage.$selectedThumb.addClass('is-active');
        }
    }

    swapMainImage() {
        this.$mainImage.attr({
            'data-zoom-image': this.currentImage.zoomImageUrl,
        }).find('img').attr({
            src: this.currentImage.mainImageUrl,
        });
        this.$mainImage.attr({
            'data-mfp-src': this.currentImage.zoomImageUrl,
        }).find('img').attr({
            src: this.currentImage.mainImageUrl,
        });
    }

    setImageZoom() {
        this.$mainImage.zoom({ url: this.$mainImage.attr('data-zoom-image'), touch: false, onZoomIn: true, onZoomOut: true });
    }

    destroyImageZoom() {
        this.$mainImage.trigger('zoom.destroy');
    }

    bindEvents() {
        this.$selectableImages.on('click', this.selectNewImage.bind(this));
    }

}

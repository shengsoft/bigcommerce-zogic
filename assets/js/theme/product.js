/*
 Import all product specific js
 */
import $ from 'jquery';
import PageManager from './page-manager';
import Review from './product/reviews';
import collapsibleFactory from './common/collapsible';
import ProductDetails from './common/product-details';
import { classifyForm } from './common/form-utils';
import productViewMagnificPopup from './halothemes/productViewMagnificPopup';
import setActiveCategory from './halothemes/setActiveCategory';
import freeShipping from './global/bapo/free-shipping';
import swatchName from './global/bapo/swatch-name';

export default class Product extends PageManager {
    constructor(context) {
        super(context);
        this.url = location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    }

    before(next) {
        // Listen for foundation modal close events to sanitize URL after review.
        $(document).on('close.fndtn.reveal', () => {
            if (this.url.indexOf('#writeReview') !== -1 && typeof window.history.replaceState === 'function') {
                window.history.replaceState(null, document.title, window.location.pathname);
            }
        });

        next();
    }

    loaded(next) {
        let validator;

        // Init collapsible
        collapsibleFactory();

        this.productDetails = new ProductDetails($('.productView'), this.context, window.BCData.product_attributes);

        // HaloThemes functions
        setActiveCategory();
        productViewMagnificPopup();     

        // Bapo functions
        freeShipping();
        swatchName();
        
        $('a.video-thumbnail').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: true,
            disableOn: function() {
              if( $(window).width() < 600 ) {
                return true;
              }
              return true;
            }
        });

        $('.productView-description-section .productView-description .specifications-tab').appendTo('.productView-description-section #specifications-tab-content'); 
        $('.productView-description-section .productView-description .support-documents-tab').appendTo('.productView-description-section #support-documents-tab-content'); 

        //Product Accordion Toggle
        const accordionItem = $('[data-accordion-item]');
        const accordionToggle = accordionItem.find('.toggle-title');

        accordionToggle.click(function(event) {
            $(this).toggleClass('is-active');
        });

        $('.productDescription .toggle-title').trigger('click');

        const $reviewForm = classifyForm('.writeReview-form');
        const review = new Review($reviewForm);

        $('body').on('click', '[data-reveal-id="modal-review-form"]', () => {
            validator = review.registerValidation();
        });

        $reviewForm.on('submit', () => {
            if (validator) {
                validator.performCheck();
                return validator.areAll('valid');
            }

            return false;
        });

        next();
    }

    after(next) {
        this.productReviewHandler();

        next();
    }

    productReviewHandler() {
        if (this.url.indexOf('#writeReview') !== -1) {
            this.$reviewLink.click();
        }
    }
}

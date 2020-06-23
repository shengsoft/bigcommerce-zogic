import $ from 'jquery';
import utils from '@bigcommerce/stencil-utils';
import { defaultModal } from '../global/modal';
import jGrowl from 'jgrowl';

export default function(){
    const modal = defaultModal();
    var imgtodrag, preview_image;
    var i = 0;


    utils.hooks.on('cart-item-add', (event, form) => {
        i = 0;
        imgtodrag = $('.productView-images').find("img").eq(0);
        $('.cart-quantity').bind("DOMSubtreeModified",function(){
            console.log(i);
            if(i == 0){
                modal.close();
                fly_image();
            }
            i++;
        });
    });

    $(document).ready(function(){

        $.jGrowl.defaults.pool = 5;
        //$.jGrowl.defaults.closerTemplate = "<div>[ hide all notifications ]</div>";
        $.jGrowl.defaults.appendTo = "body";

        $(document).on('click', 'a', function(event){
            var url = $(this).attr('href');
            if(url.indexOf('cart.php?action=add') != -1){
                const product_id = $(event.currentTarget).data('productId');
                var data = {"action" : "add","fastcart" : "1"}
                data["product_id"] =  product_id;
                data["qty[]"] = 1;

                imgtodrag = $(this).parents(".card ").find("img").eq(0);

                addToCart(data, imgtodrag);
                event.preventDefault();
            }
            else if($(this).hasClass( "quickview" )){
                preview_image = $(this).parents(".card ").find("img").eq(0);
            }
        });

    });

    function fly_image(){

        var cart = $('[data-cart-preview]');
        if(imgtodrag.offset().left == 0){
            imgtodrag = preview_image;
        }
        var imgclone = imgtodrag.clone()
            .offset({
            top: imgtodrag.offset().top,
            left: imgtodrag.offset().left
        })
            .css({
                'opacity': '0.5',
                'position': 'absolute',
                'height': '150px',
                'width': '150px',
                'z-index': '99999'
        })
            .appendTo($('body'))
            .animate({
                'top': cart.offset().top + 10,
                'left': cart.offset().left - 100,
                'height': '50px',
                'width': '50px',
        }, 600);

        imgclone.animate({
            'width': 0,
            'height': 0
        }, function () {
            $(this).detach()
        });
        var product_name = imgtodrag.attr('title');
        if(product_name == undefined){
            product_name = $('h1.productView-title').text();
        }
        var item = '<div class="item-info" style="overflow: hidden;clear: both;padding: 10px;">\
                        <div class="previewCartItem-image">\
                                <img style="max-width: 60px;" src="'+imgtodrag.attr('src')+'" alt="'+imgtodrag.attr('alt')+'" title="'+imgtodrag.attr('title')+'">\
                        </div>\
                        <div class="previewCartItem-content">\
                            <h6>'+product_name+'</h6>\
                            <p>has been successfully added to <a href="/cart.php">Your Cart</a></p>\
                        </div>\
                    </div>';
        setTimeout(function () {
            $.jGrowl(item, {
                    sticky: false,

                });
        }, 600);

    }

    function addToCart(data, imgtodrag ){
        const product_id = data.product_id;

        var form_data = new FormData();
        for ( var key in data ) {
            form_data.append(key, data[key]);
        }

        // Add item to cart
        utils.api.cart.itemAdd(form_data , (err, response) => {
            const errorMessage = err || response.data.error;

            // Guard statement
            if (errorMessage) {
                // Strip the HTML from the error message
                const tmp = document.createElement('DIV');
                tmp.innerHTML = errorMessage;
                return alert(tmp.textContent || tmp.innerText);
            }

            getCart();
        });

    }

    function getCart() {

        const options = {
            template: {
                content: 'cart/content',

                totals: 'cart/totals',
            },
        };

        utils.api.cart.getContent(options, (err, response) => {
            var $cartContent = response.content;

            const quantity = $(response.content).attr('data-cart-quantity') || 0;

            $('body').trigger('cart-quantity-update', quantity);
            fly_image();
            //$(".cart-quantity").html(quantity);
        });

    }

    /*var jG_css = '.jGrowl {z-index: 9999;color: #ffffff;font-size: 12px;font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;position: fixed;}.jGrowl.top-left {left: 0px;top: 0px;}.jGrowl.top-right {right: 0px;top: 0px;}.jGrowl.bottom-left {left: 0px;bottom: 0px;}.jGrowl.bottom-right {right: 0px;bottom: 0px;}.jGrowl.center {top: 0px;width: 50%;left: 25%;}.jGrowl.center .jGrowl-notification,.jGrowl.center .jGrowl-closer {margin-left: auto;margin-right: auto;}.jGrowl-message{background: #ffffff;border: 1px solid #cccccc;}.jGrowl-notification {background-color: #cccccc;opacity: 0.9;filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=(0.9*100));-ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=(0.9*100));zoom: 1;width: 250px;padding: 0px;margin: 10px;text-align: left;display: none;border-radius: 5px;min-height: 40px;}.jGrowl-notification .ui-state-highlight,.jGrowl-notification .ui-widget-content .ui-state-highlight,.jGrowl-notification .ui-widget-header .ui-state-highlight {border: 1px solid #000;background: #000;color: #fff;}.jGrowl-notification .jGrowl-header {font-weight: bold;font-size: .85em;}.jGrowl-notification .jGrowl-close {background-color: transparent;color: #000000;border: none;z-index: 99;float: right;font-weight: bold;font-size: 1em;cursor: pointer;}.jGrowl-closer {background-color: #000000;opacity: 0.9;filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=(0.9*100));-ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=(0.9*100));zoom: 1;width: 250px;padding: 10px;margin: 10px;text-align: left;display: none;border-radius: 5px;padding-top: 4px;padding-bottom: 4px;cursor: pointer;font-size: .9em;font-weight: bold;text-align: center;}.jGrowl-closer .ui-state-highlight,.jGrowl-closer .ui-widget-content .ui-state-highlight,.jGrowl-closer .ui-widget-header .ui-state-highlight {border: 1px solid #000;background: #000;color: #fff;}';
    $( "<style>"+jG_css+"</style>" ).appendTo( "head" )*/

}

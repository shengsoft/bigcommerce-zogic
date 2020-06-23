function menuItem(num) {
    return $('.navPages-container .navPages > ul.navPages-list > li:nth-child(' + num + ')');
}

(function() {
    $.fn.HaloMegaMenu = function(param) {
        // Defaut params
        param = $.extend({
            dropAlign: 'left',
            dropWidth: '493px',
            dropType: 'imageLeft',
            cateColumns: 1,
            bottomMegamenu: 'none',
            disabled: false,
            bottomCates: '',
            rightCates : '',
            imagesTop: '',
            desc:'',
        }, param);

        this.each(function(idx, el) {
            if (param.disabled === false) {
                const subMegaMenu = $(el).children('.navPage-subMenu');
                subMegaMenu.removeClass('subMenu').addClass('subMegaMenu');
                $(el).addClass('hasMegamenu');
                $(el).addClass('hasSub');

                // dropdown Alignment
                if (param.dropAlign === 'fullWidth') {
                    $(el).addClass('fullWidth');
                } else if (param.dropAlign === 'center') {
                    $(el).addClass('alignCenter');
                } else if (param.dropAlign === 'right') {
                    $(el).addClass('alignRight');
                } else if (param.dropAlign == 'left-edge') {
                    $(el).addClass('alignLeftEdge');
                }  else {
                    $(el).addClass('alignLeft');
                }

                // dropdown Type
                if (param.dropType === 'imageLeft') {
                    subMegaMenu.addClass('imageLeft');
                    subMegaMenu.wrapInner('<div class="cateArea"></div>');
                    subMegaMenu.prepend('<div class="imageArea colLeft">' + param.images + '</div>');
                } else if (param.dropType === 'imageRight') {
                    subMegaMenu.addClass('imageRight');
                    subMegaMenu.wrapInner('<div class="cateArea"></div>');
                    subMegaMenu.append('<div class="imageArea colRight">' + param.images + '</div>');
                } else if (param.dropType === 'noImage') {
                    subMegaMenu.addClass('noImage').wrapInner('<div class="cateArea"></div>');
                } else if (param.dropType === 'imageTop') {
                    subMegaMenu.addClass('imageTop').wrapInner('<div class="cateArea"></div>');
                } else if (param.dropType === 'descLeft') {
                    subMegaMenu.addClass('descLeft');
                    subMegaMenu.addClass('imageRight');
                    subMegaMenu.wrapInner('<div class="cateArea"></div>');
                    subMegaMenu.prepend('<div class="descArea">' + param.desc + '</div>');
                    subMegaMenu.append('<div class="imageArea colRight">' + param.images + '</div>');
            }


                // dropdown Width
                if ((param.dropAlign === 'fullWidth')) {
                    subMegaMenu.wrapInner('<div class="container"></div>');
                    subMegaMenu.css({
                        'width': '100%'
                    });
                } else {
                    subMegaMenu.css({
                        'width': param.dropWidth
                    });
                }

                // cateColumns
                if (param.cateColumns === 2) {
                    subMegaMenu.find('.cateArea').addClass('columns-2');
                } else if (param.cateColumns === 3) {
                    subMegaMenu.find('.cateArea').addClass('columns-3');
                } else if (param.cateColumns === 4) {
                    subMegaMenu.find('.cateArea').addClass('columns-4');
                } else if (param.cateColumns === 5) {
                    subMegaMenu.find('.cateArea').addClass('columns-5');
                } else if (param.cateColumns === 6) {
                    subMegaMenu.find('.cateArea').addClass('columns-6');
                }

                // imageAreaWidth
                subMegaMenu.find('.imageArea').css({
                    'width': '100%',
                    'max-width': param.imageAreaWidth
                });

                // descAreaWidth
                subMegaMenu.find('.descArea').css({
                    'width': '100%',
                    'max-width': param.descAreaWidth
                });

                // cateAreaWidth
                subMegaMenu.find('.cateArea').css({
                    'width': '100%',
                    'max-width': param.cateAreaWidth
                });

                if (param.bottomCates.length && (param.bottomCates !== '')) {
                    subMegaMenu.find('.cateArea').addClass('has-bottom-cates');
                    subMegaMenu.find('.cateArea > ul').append('<div class="bottomCate" style="max-width: ' + param.cateAreaWidth + '">' + param.bottomCates + '</div>');
                }

                if (param.rightCates.length && (param.rightCates !== '')) {
                    subMegaMenu.find('.cateArea').addClass('has-bottom-cates');
                    subMegaMenu.find('.cateArea > ul').append('<li class="rightCate" style="max-width: ' + param.cateAreaWidth + '">' + param.rightCates + '</li>');
                }

                if (param.imagesTop.length && (param.imagesTop !== '')) {
                    function megamenuImageTop($_image_array) {
                        var j = 0;
                        for (var i = 0; i < $_image_array.length; i++) {
                            j = i + 1;
                            subMegaMenu.find('.cateArea > ul > li:nth-child(' + j + ') > a').before($_image_array[i]);
                        }
                    }
                    megamenuImageTop(param.imagesTop);
                }

                if (param.bottomMegamenu.length && (param.bottomMegamenu !== 'none')) {
                    subMegaMenu.append('<div class="bottomMegamenu">' + param.bottomMegamenu + '</div>');
                }

            }
        });
        return this;
    }
})(jQuery);

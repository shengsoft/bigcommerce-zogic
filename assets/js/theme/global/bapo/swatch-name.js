/* eslint-disable */
export default function () {
    $('.form-option').on('click', function() {
        const $optionName = $(this).find('.form-option-variant').attr('title');
        $(this).parents('.form-field').find('[data-option-value]').text($optionName);
    });
}

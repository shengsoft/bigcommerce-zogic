import $ from 'jquery';
import nod from '../common/nod';
import forms from '../common/models/forms';
import { classifyForm, Validators } from '../common/form-utils';

export default function() {

    $(document).ready(function() {

        $('.customer-login > .toggle-dropdown-login').on('click',function(ev) {
            ev.preventDefault();
            $(this).parent().toggleClass('is-open');
        });
        $(document).on('click', function(ev) {
            if ($(ev.target).closest(".customer-login").length === 0) {
                $('.customer-login').removeClass('is-open');
            }
        });
    });

}

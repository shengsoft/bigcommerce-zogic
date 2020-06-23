import $ from 'jquery';
import nod from '../common/nod';
import forms from '../common/models/forms';
import { classifyForm, Validators } from '../common/form-utils';

export default function() {
    var login_count = 0;
    var getLocation = function(href) {
        var l = document.createElement("a");
        l.href = href;
        return l;
    };

    $(document).ready(function() {
        loaded();
    });

    function registerLoginValidation($loginForm) {
        const loginModel = forms;

        const loginValidator = nod({
            submit: '.login-popup input[type="submit"]',
        });

        loginValidator.add([{
            selector: '.login-popup input[name="login_email"]',
            validate: (cb, val) => {
                const result = loginModel.email(val);
                cb(result);
            },
            errorMessage: 'Please use a valid email address, such as dat@example.com.',
        }, {
            selector: '.login-popup input[name="login_pass"]',
            validate: (cb, val) => {
                const result = loginModel.password(val);
                cb(result);
            },
            errorMessage: 'You must enter a password.',
        }, ]);

        $loginForm.submit((event) => {

            loginValidator.performCheck();

            if (loginValidator.areAll('valid')) {
                if(login_count == 0){
                    var form = $loginForm;
                    var data = form.serialize();
                    var securePath = getLocation(form[0].action);
                    var url = '';
                    if(window.location.port){
                        url = window.location.protocol + '//' +window.location.hostname + ':' + window.location.port;
                    }
                    else{
                        url = window.location.protocol + '//' +window.location.hostname;
                    }
                    var result = true;

                    $.ajax({
                        url: url + '/remote.php',
                        type: 'post',
                        dataType: 'json',
                        //async: false,
                        data: 'w=expressCheckoutLogin&'+data,
                        beforeSend: function() {
                            $("#popup-loading").show();
                        },
                        success: function(response, textStatus, xhr) {
                            if (response.status){
                                var encodedString = btoa(data);
                                if(window.location.pathname == '/login.php'){
                                    location = url + '/account.php';
                                }
                                else if(securePath.hostname != window.location.hostname){
                                    login_count = 1;
                                    $(event.currentTarget).trigger('submit');
                                }
                                else{
                                    location.reload();
                                }
                            }
                            else{
                                alert("Your email address or password is incorrect. Please try again.");
                            }
                        },
                        complete: function() {
                            $("#popup-loading").hide();
                        }
                    });
                    event.preventDefault();
                }
            }
            else{
                event.preventDefault();
            }
        });
    }


    /**
     * Request is made in this function to the remote endpoint and pulls back the states for country.
     * @param next
     */
    function loaded() {

        const $loginForm = classifyForm('.login-popup');

        if ($loginForm.length) {
            registerLoginValidation($loginForm);
        }

    }

}

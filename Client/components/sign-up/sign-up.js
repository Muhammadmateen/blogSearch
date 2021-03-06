/**
 * Created by MUHAMMAD MATEEN on 28-Feb-16.
 */
/**
 * Created by Mateen Bhai on 2/5/2016.
 */


(function () {
    angular.module("blogApp")

        .controller("signUpController", ['$http', '$state', 'alert_dialog_service', 'toast_service','heroku_url', signUpController])


    function signUpController($http, $state, alert_dialog_service, toast_service,heroku_url) {
        var _self = this;
        _self.email_loader = false;
        _self.email_in_used = false;
        _self.loader = false;

        var title = "Successfully Register!";
        var message = "Email sent to admin for authorization.";
        var btnVal = "OK";

        //Sale's man Sign up function
        _self.sign_up = function (ev) {
            if (!_self.email_in_used) {
                _self.loader = true;
                $http.post(heroku_url+'/sign_up_user', _self.user).then(function (result) {
                    _self.loader = false;
                    switch (result.data) {
                        case '200':
                            alert_dialog_service.showDialog(ev, title, message, btnVal);
                            break;
                        case '804':
                            alert_dialog_service.showDialog(ev, "Error", "Internal Error in registration.", btnVal);
                            break;
                    }
                    $state.go($state.current, [], {reload: true});

                }, function (err) {
                    _self.loader = false;
                    toast_service.showSimpleToast(err);
                    //alert("Request Not send on server");
                    _self.user = "";
                })
            }
            else {
                toast_service.showSimpleToast("Please enter valid email address");
            }

        };


        //Check signup user email in database that already in use or not
        _self.checkEmail = function (response) {
            if (response != undefined) {
                _self.email_loader = true;
                $http.post(heroku_url+"/check_email", {email: response}).then(function (result) {
                    _self.email_loader = false;
                    switch (result.data) {
                        case '200':
                            //you can create account with this email
                            _self.email_in_used = false;
                            break;
                        case '1100':
                            //Email id already exist
                            _self.email_in_used = true;
                            break;
                        default :
                            toast_service.showSimpleToast(result);

                    }

                }, function (err) {
                    _self.email_loader = false;
                    toast_service.showSimpleToast(err);
                });
            }
        };

    };
})();


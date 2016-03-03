/**
 * Created by MUHAMMAD MATEEN on 29-Feb-16.
 */



(function ()
{
    'use strict';
    angular.module('blogApp')
        .factory('alert_dialog_service',function($mdDialog)
        {
            var obj = {};
            obj.showDialog = function(ev,title,message,btnVal)
            {
                $mdDialog.show(
                    $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title(title)
                        .textContent(message)
                        .ariaLabel('Alert Dialog')
                        .ok(btnVal)
                        .targetEvent(ev)
                );
            }

            return obj;
        })

})();
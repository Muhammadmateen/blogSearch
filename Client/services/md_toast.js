/**
 * Created by MUHAMMAD MATEEN on 29-Feb-16.
 */

(function ()
{
    'use strict';
    angular.module('blogApp')
        .factory('toast_service',function($mdToast)
        {
            var obj = {};
            var _self = this;

            obj.showSimpleToast = function(data) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(data)
                        .position(_self.getToastPosition())
                        .hideDelay(3000)
                );
            };

            _self.toastPosition = {
                bottom: false,
                top: true,
                left: false,
                right: true
            };

            //get the position of Toast
            _self.getToastPosition = function() {
                return Object.keys(_self.toastPosition)
                    .filter(function(pos) { return _self.toastPosition[pos]; })
                    .join(' ');
            };

            return obj;
        })

})();
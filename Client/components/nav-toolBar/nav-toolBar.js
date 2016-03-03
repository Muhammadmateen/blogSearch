/**
 * Created by MUHAMMAD MATEEN on 28-Feb-16.
 */

(function()
{
    angular.module("blogApp")

        .controller("navToolBarController",['$http','$mdToast','toast_service','$timeout','$mdSidenav',navToolBarController])

    function navToolBarController($http,$mdToast,toast_service,$timeout,$mdSidenav)
    {
        var _self = this;
        _self.loader = false;




        //Logout function
        _self.logout = function()
        {
            console.log("Logout");
        }




        //Side Nav bar
        this.toggleLeft = buildDelayedToggler('left');

        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
                var context = this,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }

        function buildDelayedToggler(navID) {
            return debounce(function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {

                    });
            }, 200);
        }

        function buildToggler(navID) {
            return function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {

                    });
            }
        }
        //Expand more logo appearance
        _self.openMenu = function($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };

    }

}());


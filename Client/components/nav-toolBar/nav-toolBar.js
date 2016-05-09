/**
 * Created by MUHAMMAD MATEEN on 28-Feb-16.
 */

(function()
{
    angular.module("blogApp")

        .controller("navToolBarController",['$http','$mdToast','toast_service','$timeout','$mdSidenav','$state','authService',navToolBarController])

    function navToolBarController($http,$mdToast,toast_service,$timeout,$mdSidenav,$state,authService)
    {
        var _self = this;
        _self.loader = false;

        _self.checkUser = function()
        {
            if(authService.localData().role == 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        };




        //Logout function
        _self.logout = function()
        {
            $http.post("/logout").then(function(data)
            {
               localStorage.removeItem("loggedInUser");
                $state.go("login");
            },function(err)
            {
                toast_service.showSimpleToast("Error ",err);
            })

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

        _self.closeMenu = function()
        {
            $mdSidenav('left').close();
        }
        //Expand more logo appearance
        _self.openMenu = function($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };

    }

}());


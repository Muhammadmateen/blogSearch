/**
 * Created by MUHAMMAD MATEEN on 28-Feb-16.
 */

(function()
{
    angular.module("blogApp")

        .controller("navToolBarController",['$http','$mdToast','toast_service','$timeout','$mdSidenav','$state','authService','heroku_url',navToolBarController])

    function navToolBarController($http,$mdToast,toast_service,$timeout,$mdSidenav,$state,authService,heroku_url)
    {
        var _self = this;
        _self.loader = false;

        _self.checkUser = function()
        {
            if(authService.localData() != null)
            {
                if(authService.localData().role == 1)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }

        };

        var storageRef = firebase.storage().ref();
        _self.uploadPic = function()
        {
            var picId = authService.localData().uid;
            console.log("UID : ",authService.localData().uid);
            var picData = document.getElementById("profilePic").files[0];
            console.log("Data : ",picData);

            var uploadTask = storageRef.child('blogSearch/users/' + picId).put(picData);

            uploadTask.on('state_changed', function(snapshot){
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, function(error) {
                console.log("Error in uploading",error);
            }, function() {

                var downloadURL = uploadTask.snapshot.downloadURL;
                console.log("File upload successfully: ",downloadURL);
            });
        };



        //Logout function
        _self.logout = function()
        {
            $http.post(heroku_url+"/logout").then(function(data)
            {
               localStorage.removeItem("loggedInUser");
                $state.go("login");
            },function(err)
            {
                toast_service.showSimpleToast("Error ",err);
            })

        };




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


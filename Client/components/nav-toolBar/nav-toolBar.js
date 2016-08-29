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
            var picData = document.getElementById("profilePic").files[0];
            if(picData)
            {
                var fileType = picData.type.split("/");
                if(fileType[0]=="image")
                {
                    var picId = authService.localData().uid;
                    var uploadTask = storageRef.child('blogSearch/users/' + picId).put(picData);

                    uploadTask.on('state_changed', function(snapshot){
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                    }, function(error) {
                        document.getElementById("profilePic").value = "";
                        toast_service.showSimpleToast("Error : Image not uploaded");
                        console.log("Error in uploading",error);
                    }, function() {
                        document.getElementById("profilePic").value = "";
                        toast_service.showSimpleToast("Profile image changed successfully");
                        var downloadURL = uploadTask.snapshot.downloadURL;
                        console.log("File upload successfully: ",downloadURL);
                        
                    });
                }
                else{
                    toast_service.showSimpleToast("Please select only images");
                }
            }else{
                    toast_service.showSimpleToast("Please select image");
            }

            
            
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


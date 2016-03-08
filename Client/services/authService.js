/**
 * Created by MUHAMMAD MATEEN on 02-Mar-16.
 */



    angular.module("blogApp")
        .factory("authService",['$state','$q','$http',function($state,$q,$http)
        {
            var authServiceObj = {};

            function localData()
            {
                return JSON.parse(localStorage.getItem("loggedInUser"));
            };

            authServiceObj.userStatus = function()
            {
                var loggedInUser = localData();
                if(loggedInUser)
                {
                    if(loggedInUser.uid && loggedInUser.name && loggedInUser.role)
                    {
                        $http.post("/userStatus",loggedInUser).then(function(data)
                        {
                            if(data.data == true)
                            {
                                console.log(data.data);
                                console.log("User login");
                            }
                            else
                            {
                                console.log(data.data);
                                console.log("User not login");
                            }

                        },function(err)
                        {
                            console.log("Request not send for check user status");
                            console.log("Error",err);
                        })
                    }
                    else
                    {
                        //console.log("loggedIn user property not defined");
                        if($state.current == '/')
                         {
                         console.log("State go /");
                         //$state.go("/");
                         }
                         else
                         {
                         console.log("State go login");
                         //$state.go("login");
                         }
                    }
                }
                else
                {
                    //console.log("loggedIn user not defined");
                }
            }

            return authServiceObj;
        }]);
/**
 * Created by MUHAMMAD MATEEN on 02-Mar-16.
 */



    angular.module("blogApp")
        .factory("authService",['$state','$q',function($state,$q)
        {
            var user = localStorage.getItem("uid");

            return true
            /*{

                auth : function abc() {
                    var deferred = $q.defer();
                    if(user)
                    {
                        console.log("/")
                        $state.go("/");
                        deferred.resolve();
                    }
                    else
                    {
                        console.log("Sign up");
                        $state.go("sign-up");
                        deferred.resolve();
                    }
                    return deferred.promise;
                }
            }*/


        }]);
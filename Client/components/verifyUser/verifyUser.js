/**
 * Created by MUHAMMAD MATEEN on 06-Mar-16.
 */


(function()
{

    angular.module('blogApp')
        .controller("verifyUserController",['$http','$stateParams','heroku_url',verifyUserController])

    function verifyUserController($http,$stateParams,heroku_url)
    {

        var _self  = this;
        var user_uid = $stateParams.id;
        var invalid_req = "Invalid Request";
        _self.loader = true;


        if(user_uid != null && user_uid != "")
        {
            $http.post(heroku_url+'/verifyUser',{id :user_uid}).then(function(data)
            {
                _self.loader = false;
                if(data.data.n == 1 && data.data.nModified == 0 && data.data.ok == 1)
                {
                    _self.result = "The invitation link isn't valid. Perhaps you already use it?";
                }
                else if(data.data.n == 1 && data.data.nModified == 1 && data.data.ok == 1)
                {
                    _self.result = "Successful! Your account is verified...";
                }
                else
                {
                    _self.result = invalid_req;
                }

            },function(err)
            {
                _self.result = invalid_req;
            })
        }
        else
        {
            _self.result = invalid_req;
        }

    }



}());
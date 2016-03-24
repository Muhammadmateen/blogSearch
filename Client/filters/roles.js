/**
 * Created by Mateen Bhai on 3/24/2016.
 */


(function ()
{
    'use strict';
    angular.module('blogApp')
        .filter('roleFilter',function()
        {
            return function (role)
            {
                switch (role)
                    {
                        case 1:
                            return "Admin"
                        case 2 :
                            return "Member"
                        case 3 :
                            return "User"
                    }
            }
        })

})();
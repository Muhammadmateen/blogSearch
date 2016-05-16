/**
 * Created by Mateen Bhai on 5/16/2016.
 */


(function()
{
    angular.module("blogApp")
        .controller("changePassController",['$http','toast_service','heroku_url',changePassController])


    function changePassController($http,toast_service,heroku_url)
    {

        var _self = this;

        _self.updatePass = function()
        {
            //console.log("OK ",_self.user);

            if(_self.user)
            {
                if(_self.user.oldPass && _self.user.newPass && _self.user.cnfrmPass)
                {
                    if(_self.user.newPass == _self.user.cnfrmPass)
                    {
                        console.log("verified Data : ",_self.user);
                        $http.put(heroku_url+"/updatePass",_self.user).then(function(data)
                        {
                            console.log("Data : ",data.data);

                        },function(err)
                        {
                            toast_service.showSimpleToast("Error : ",err);
                            console.log("Error : ",err);
                        });
                    }
                    else
                    {
                        toast_service.showSimpleToast("Confirm Password does not match");
                        console.log("confirm password does not match");
                    }
                }
            }
        };

    };


})();


/*
exports.forget = forget;
// Password reset Function
function passwordReset(req, res) {
    console.log(req);
    usermodel_1.UserModel.findOne({
        _id: req.query.token
    }, function(err, success) {
        if (success) {
            bcrypt.compare(req.body.password, success.password, function(err,
                                                                         isMatch) {
                done(err, isMatch);

            });
        }

        function done(err2, isMatch) {
            if (isMatch) {
                bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
                    if (err) {
                        return done(err);
                    }
                    bcrypt.hash(req.body.newPassword, salt, null, function(err,
                                                                           hashedPassword) {
                        if (err) {
                            return done(err);
                        }
                        usermodel_1.UserModel.update({
                            _id: req.query.token
                        }, {
                            $set: {
                                password: hashedPassword
                            }
                        }, function(err, data) {
                            res.send(success);

                        });

                    });
                });

            } else if (!isMatch) {
                usermodel_1.AddUserModel.findOne({
                    _id: req.query.token
                }, function(err, success) {
                    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
                        if (err) {
                            return done(err);
                        }
                        bcrypt.hash(req.body.newPassword, salt, null, function(
                            err, hashedPassword) {
                            if (err) {
                                return done(err);
                            }
                            usermodel_1.AddUserModel.update({
                                _id: req.query.token
                            }, {
                                $set: {
                                    password: hashedPassword
                                }
                            }, function(err, data) {
                                res.send(success);

                            });
                        });

                    });
                });

            } else {
                res.send("Password does not match");
            }
        }
    });
}*/

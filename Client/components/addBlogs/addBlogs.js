/*Created by MUHAMMAD MATEEN on 28-Feb-16.*/


(function()
{
    angular.module("blogApp")

        .controller("addBlogsController",['toast_service','$timeout','$mdSidenav','$scope','addBlogsService','$state','$http','heroku_url',addBlogsController])

    function addBlogsController(toast_service,$timeout,$mdSidenav,$scope,addBlogsService,$state,$http,heroku_url)
    {
        var _self = this;
        _self.loader = false;
        _self.blogUrl_in_used = false;
        _self.blogUrl_loader = false;

        $scope.csv = {
            content: null,
            header: true,
            headerVisible: true,
            separator: ',',
            separatorVisible: true,
            result: null,
            encoding: 'ISO-8859-1',
            encodingVisible: true,
        };

        var _lastGoodResult = '';
        $scope.toPrettyJSON = function (json, tabWidth) {
            var objStr = JSON.stringify(json);
            var obj = null;
            try {
                obj = $parse(objStr)({});
            } catch(e){
                // eat $parse error
                return _lastGoodResult;
            }

            var result = JSON.stringify(obj, null, Number(tabWidth));
            _lastGoodResult = result;

            return result;
        };

        //CSV blog file
        _self.blogFileUpload = function()
        {
            if($scope.csv.result)
            {
                if($scope.csv.result == "[]")
                {
                    toast_service.showSimpleToast("Provided File is empty");
                }
                else
                {
                    _self.loader = true;
                    addBlogsService.csvFile(_self.wrongSampleData).then(function(data)
                    {
                        _self.loader = data;
                    },function(err)
                    {
                        _self.loader = data;
                    });
                }
            }
            else
            {
                toast_service.showSimpleToast("Select the file first");
            }
        };


        _self.siteCategory = [];
        //Single blog item
        _self.addBlog = function()
        {
            _self.loader = true;
            if(_self.data.blogUrl != undefined)
            {
                _self.data.siteCategory = _self.siteCategory;
                addBlogsService.blogItem(_self.data).then(function(data)
                {
                    _self.loader = false;
                    console.log("data addded",data);
                    $state.go($state.current,{},{reload:true});
                },function(err)
                {
                    console.log("Error : ",err);
                    _self.loader = false;
                    $state.go($state.current,{},{reload:true});

                });
            }
            else
            {
                toast_service.showSimpleToast("Please Enter URL");
            }
        };


        _self.checkBlogUrl = function(url)
        {
            if(url)
            {
            _self.blogUrl_loader = true;
            var str_url = url;
            var url_split = str_url.split("www.",2);
            var final_url_split = url_split[1].split(".com");
            _self.data.blogUrl = "www."+final_url_split[0]+".com";

                $http({method:'GET',url:heroku_url+'/checkBlogUrl',params:{blogUrl:_self.data.blogUrl}}).then(function(data)
                {
                    _self.blogUrl_loader = false;
                    console.log("Daat : ",data.data);
                    if(data.data)
                    {
                        console.log("Already exist url");
                        _self.blogUrl_in_used = true;
                    }
                    else
                    {
                        console.log("Url allow to enter");
                        _self.blogUrl_in_used = false;
                    }


                },function(err)
                {
                    _self.blogUrl_loader = false;
                    _self.blogUrl_in_used = err.data;
                    console.log("Error :",err.data);
                })

            }
            else{
            }

        };

        _self.correctSampleData = [
            {
                blogUrl:"www.yahoo.com",
                siteCategory:['technology','social','health'],
                DA:32,
                CF:7,
                TF:52,
                preWrittenRate:300,
                bloggerRate:250,
                negotiatedRate:500,
                bloggerName:'John',
                location:'USA',
                contactDetails:'john@hotmail.com',
                comments:'good blogger',
                acceptCasino:'yes',
                siteType:'real',
                acceptDofollow:'no',
                googleIndex:'de-index',
                ipAddress:'192.168.1.1',
                blogSource:'yahoo',
                participated:'interested in participaton'

            },{
                blogUrl:"www.google.com",
                siteCategory:['technology','networking'],
                DA:32,
                CF:7,
                TF:52,
                preWrittenRate:300,
                bloggerRate:250,
                negotiatedRate:500,
                bloggerName:'John',
                location:'USA',
                contactDetails:'john@hotmail.com',
                comments:'good blogger',
                acceptCasino:'yes',
                siteType:'real',
                acceptDofollow:'no',
                googleIndex:'de-index',
                ipAddress:'192.168.1.1',
                blogSource:'yahoo',
                participated:'interested in participaton'
            },
            {
                blogUrl:'www.facebook.com',
                siteCategory:['social'],
                DA:32,
                CF:7,
                TF:52,
                preWrittenRate:300,
                bloggerRate:250,
                negotiatedRate:500,
                bloggerName:'John',
                location:'USA',
                contactDetails:'john@hotmail.com',
                comments:'good blogger',
                acceptCasino:'yes',
                siteType:'real',
                acceptDofollow:'no',
                googleIndex:'de-index',
                ipAddress:'192.168.1.1',
                blogSource:'yahoo',
                participated:'interested in participaton'
            }/*,
            {
                blogUrl:'www.twitter.com',
                siteCategory:['style','jwellery','gold'],
                DA:85,
                PR:10,
                TF:89,
                siteType:'gh site',
                preWrittenRate:500,
                bloggerWriteRate:455,
                acceptDofollow:'no',
                negotiated:'yes',
                bloggerName:'alpha',
                contactDetails:'malaysia',
                blogSource:null,
                comments:null,
                participated:'yes'
            },
            {
                blogUrl:'www.github.com',
                siteCategory:null,
                DA:85,
                PR:10,
                TF:98,
                siteType:null,
                preWrittenRate:110,
                bloggerWriteRate:85,
                acceptDofollow:null,
                negotiated:null,
                bloggerName:'Bravo',
                contactDetails:null,
                blogSource:null,
                comments:null,
                participated:null
            }*/
        ];

        _self.wrongSampleData = [
            {
                 blogUrl:'www.google3.com',           //Error here duplicate value passes
                 siteCategory:'cloud',
                 DA:25,
                 CF:7,
                 TF:52,
                 preWrittenRate:300,
                 bloggerRate:250,
                 negotiatedRate:500,
                 bloggerName:'John',
                 location:'USA',
                 contactDetails:'john@hotmail.com',
                 comments:'good blogger',
                 acceptCasino:'yes',
                 siteType:'real',
                 acceptDofollow:'no',
                 googleIndex:'de-index',
                 ipAddress:'192.168.1.1',
                 blogSource:'yahoo',
                 participated:null
            },{
                 blogUrl:'www.google4.com',
                 siteCategory:['technology','social','health'],
                 DA:32,
                 CF:7,
                 TF:52,
                 preWrittenRate:300,
                 bloggerRate:250,
                 negotiatedRate:500,
                 bloggerName:'John',
                 location:'USA',
                 contactDetails:'john@hotmail.com',
                 comments:'good blogger',
                 acceptCasino:'yes',
                 siteType:'real',
                 acceptDofollow:'no',
                 googleIndex:'de-index',
                 ipAddress:'192.168.1.1',
                 blogSource:'yahoo',
                 participated:'interested in participaton'
            },{
                 blogUrl:'www.google4.com',
                 siteCategory:['technology','social','health'],
                 DA:32,
                 CF:7,
                 TF:52,
                 preWrittenRate:300,
                 bloggerRate:250,
                 negotiatedRate:500,
                 bloggerName:'John',
                 location:'USA',
                 contactDetails:'john@hotmail.com',
                 comments:'good blogger',
                 acceptCasino:'yes',
                 siteType:'real',
                 acceptDofollow:'no',
                 googleIndex:'de-index',
                 ipAddress:'192.168.1.1',
                 blogSource:'yahoo',
                 participated:'interested in participaton'
            },{
                 blogUrl:'www.panacloud.com',
                 siteCategory:['technology','social','health'],
                 DA:32,
                 CF:7,
                 TF:52,
                 preWrittenRate:300,
                 bloggerRate:250,
                 negotiatedRate:500,
                 bloggerName:'John',
                 location:'USA',
                 contactDetails:'john@hotmail.com',
                 comments:'good blogger',
                 acceptCasino:'yes',
                 siteType:'real',
                 acceptDofollow:'no',
                 googleIndex:'de-index',
                 ipAddress:'192.168.1.1',
                 blogSource:'yahoo',
                 participated:'interested in participaton'
            }
        ];


        //Working on single
        /*_self.singleBlogData1 = {
                blogUrl:123,        //Error data type number passed
                siteCategory:null,
                DA:85,
                PR:10,
                TF:98,
                siteType:null,
                preWrittenRate:110,
                bloggerWriteRate:85,
                acceptDofollow:null,
                negotiated:null,
                bloggerName:'Bravo',
                contactDetails:null,
                blogSource:null,
                comments:null,
                participated:null
            };*/


        /*_self.singleBlogData2 = {
                blogUrl:'www.olx2.com',
                siteCategory:'abcd',        //Error data type string passed here array required in string
                DA:85,
                PR:10,
                TF:98,
                siteType:null,
                preWrittenRate:110,
                bloggerWriteRate:85,
                acceptDofollow:null,
                negotiated:null,
                bloggerName:'Bravo',
                contactDetails:null,
                blogSource:null,
                comments:null,
                participated:null
            };*/

        /*_self.singleBlogData3 = {
                blogUrl:'www.olx3.com',
                siteCategory:[25,30],        //Error data type int passed here array required in string
                DA:85,
                PR:10,
                TF:98,
                siteType:null,
                preWrittenRate:110,
                bloggerWriteRate:85,
                acceptDofollow:null,
                negotiated:null,
                bloggerName:'Bravo',
                contactDetails:null,
                blogSource:null,
                comments:null,
                participated:null
            };*/

        /*_self.singleBlogData4 = {
                blogUrl:'www.olx4.com',
                siteCategory:['ab','cd'],
                DA:'Ab',        //Error data type string passed
                PR:'Bc',        //Error data type string passed
                TF:'De',        //Error data type string passed
                siteType:null,
                preWrittenRate:110,
                bloggerWriteRate:85,
                acceptDofollow:null,
                negotiated:null,
                bloggerName:'Bravo',
                contactDetails:null,
                blogSource:null,
                comments:null,
                participated:null
            };*/

    }

}());

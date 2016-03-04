/**
 * Created by MUHAMMAD MATEEN on 28-Feb-16.
 */

'use strict';

var app = angular.module("blogApp",
            [
                'ngMdIcons',
                'ngMaterial',
                'ui.router',
                'ngCsvImport',
                'ngFileSaver',
                'ngMdIcons'
            ]);


app.run(function()
{
    console.log("Run phase work");
})
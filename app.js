//依赖注入oc.lazyLoad
var app = angular.module('myApp',['ui.router','oc.lazyLoad']);
//主页控制器
app.controller('myCtrl',function ($scope) {
    $scope.main = "ocLazyLoad+uiRouter实现angular单页面应用的控制器js文件按需加载";
});
//配置config
app.config(function ($stateProvider, $locationProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        //懒加载控制器的三种写法（为一个模块的前提下）
        .state('a',{
            url : '/a',
            controller : 'ctrla',//不写会报错
            templateUrl : './tpl/pagea.html',
            resolve : {
                loadMyCtrl : ['$ocLazyLoad',function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'myApp',//模块的名字，单个模块可以省略
                        files: ['ctrl/ctrla.js']//js文件地址
                    })
                }]
            }
        })
        .state('b',{
            url : '/b',
            templateUrl : './tpl/pageb.html',
            controller : 'ctrlb',
            resolve : {
                loadMyCtrl : function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'myApp',
                        files: ["ctrl/ctrlb.js"]
                    })
                }
            }
        })
        .state('c',{
            url : '/c',
            templateUrl : './tpl/pagec.html',
            controller : 'ctrlc',
            resolve : {
                loadMyCtrl : function ($ocLazyLoad) {
                    return $ocLazyLoad.load("ctrl/ctrlc.js")
                }
            }
        })
});

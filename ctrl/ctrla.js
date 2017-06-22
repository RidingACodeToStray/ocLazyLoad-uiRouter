//使用app的名字注册控制器会报错
angular.module("myApp").controller('ctrla', function ($scope) {
   console.log(1);
   $scope.testA = 999;
});
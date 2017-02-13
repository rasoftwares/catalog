var app = angular.module('catalogApp', ['ngRoute']);


/* Routing logic of the app */
app.config(['$routeProvider', function($routeProvider){

  //Source directory where all of the html fragments are placed
  var src_dir = "app/views/";

  $routeProvider
    .when('/',{ templateUrl: src_dir +'home.html'})
    .when('/settings',{ templateUrl: src_dir +'settings.html'})
    .when('/gendral',{ templateUrl: src_dir +'gendral.html'})
    .when('/about',{ templateUrl: src_dir +'about.html'})
    .when('/cart',{ templateUrl: src_dir +'cart.html'})
    .otherwise({redirectTo: '/'});
}]);

// Routing logic ends


app.controller('appController', ['$scope', '$http', function ($scope, $http) {
	   $scope.productList = info.product;

    $scope.pageTitle="Catalog";
    $scope.pageHeader="Product Catalog";


}]);

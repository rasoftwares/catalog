var app = angular.module('catalogApp', ['ngRoute']);


/* Routing logic of the app */
app.config(['$routeProvider', function($routeProvider){

  //Source directory where all of the html fragments are placed
  var src_dir = "app/views/";

  $routeProvider
    .when('/',{ templateUrl: src_dir +'home.html'})
    .when('/general',{ templateUrl: src_dir +'general.html'})
    .when('/about',{ templateUrl: src_dir +'about.html'})
    .when('/cart',{ templateUrl: src_dir +'cart.html'})
    .otherwise({redirectTo: '/'});
}]);

// Routing logic ends



app.controller('appController', ['$scope', '$http','$filter', function ($scope,$http,filteredListService,$filter) {


      $scope.pageTitle="Catalog";
      $scope.pageHeader="Product Catalog";
      //  $scope.subHeader=info.company.name;
      //$scope.companyName=info.company.name;
      $scope.currentPage = 0;
      $scope.itemsPerPage = 8;

      $scope.productList = info.product;

      for (var i = 0; i < $scope.productList.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.productList[Math.floor(i / $scope.itemsPerPage)] = [ $scope.productList[i] ];
            } else {
                $scope.productList[Math.floor(i / $scope.itemsPerPage)].push($scope.productList[i]);
            }
        }
      $scope.range = function (start, end) {
          var ret = [];
          if (!end) {
              end = start;
              start = 0;
          }
          for (var i = start; i < end/$scope.itemsPerPage; i++) {
              ret.push(i);
          }
          return ret;
      };

      $scope.prevPage = function () {
          if ($scope.currentPage > 0) {
              $scope.currentPage--;
          }
      };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.productList.length/$scope.itemsPerPage- 1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    }
}]);

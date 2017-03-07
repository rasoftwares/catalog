var app = angular.module('catalogApp', ['ngRoute']);


/* Routing logic of the app */
app.config(['$routeProvider', function($routeProvider){
   var src_dir = "app/views/";
  //Source directory where all of the html fragments are placed
  $routeProvider.
      when('/about', {
      templateUrl: src_dir +'about.html'
      }).
      when('/general', {
      templateUrl:  src_dir +'general.html'
      }).
      when('/default', {
        templateUrl: src_dir +'default.html',
        controller: storeController
      }).
      when('/images/:productimage', {
        templateUrl: src_dir +'product.html',
        controller: storeController
      }).
      when('/cart', {
        templateUrl:  src_dir +'cart.html',
        controller: storeController
      }).
      otherwise({
        redirectTo: '/default'
      });
}]);




// Routing logic ends



app.controller('appController', ['$scope', '$http','$filter', function ($scope,$http,filteredListService,$filter) {

  function appController($scope, $routeParams, DataService) {
    $scope.store = DataService.store;
    $scope.cart  = DataService.cart;
    $scope.total = $scope.cart.getTotalCount();

    }

      //$scope.total=total;
      $scope.pageTitle="Catalog";
      $scope.pageHeader="Product Catalog";
      $scope.search_title="Go";
      $scope.enableSearch = false;
      $scope.menuItems = [{"name":"Home", "url": "/", "onClick":"home", "visible" : true},
                        {"name":"Settings", "url": "", "onClick":"", "visible" : true},
                      {"name":"cart", "url": "/cart", "onClick":"cart", "visible" :true}

                 ];
                 $scope.currentPage = 0;
                 $scope.itemsPerPage = 8;
                 $scope.products= info.product;

                 for (var i = 0; i < $scope.products.length; i++) {
                       if (i % $scope.itemsPerPage === 0) {
                           $scope.products[Math.floor(i / $scope.itemsPerPage)] = [ $scope.products[i] ];
                       } else {
                           $scope.products[Math.floor(i / $scope.itemsPerPage)].push($scope.products[i]);
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
                   if ($scope.currentPage < $scope.products.length/$scope.itemsPerPage- 1) {
                       $scope.currentPage++;
                   }
               };

               $scope.setPage = function () {
                   $scope.currentPage = this.n;
               }
      //  $scope.subHeader=info.company.name;
      //$scope.companyName=info.company.name;

}]);

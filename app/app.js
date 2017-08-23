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
      }).
      when('/images/:id', {
        templateUrl: src_dir +'product.html',
      }).
      when('/cart', {
        templateUrl:  src_dir +'cart.html',
      }).
      otherwise({
        redirectTo: '/default'
      });
}]);




// Routing logic ends



/*app.controller('appController', ['$scope', '$http','$filter', function ($scope,$http,filteredListService,$filter) {


/*$scope.menuItems = [{"name":"Home", "url": "/", "onClick":"home", "visible" : true},
                    {"name":"Settings", "url": "", "onClick":"", "visible" : true},
                    {"name":"cart", "url": "/cart", "onClick":"cart", "visible" :true}

             ];





}]);*/




app.controller('appController', function($scope,$http,$filter,$routeParams,DataService){
    $scope.companyName=info.company.name;
    $scope.pageTitle="Catalog";
    $scope.pageHeader="Product Catalog";
    $scope.search_title="Go";
    $scope.enableSearch = false;
  //$scope.store = DataService.store;
    $scope.cart  = DataService.cart;

    var firebaseURL = 'https://onetouch-d52d4.firebaseio.com/';
    var environment = 'dev';
    var dataStore = 'request';
    var authKey = 've8PdopndzS3yD35SMF6KAd4VKpHQuxUotXNeHGw';
    var data = "-KkjanVwZAC_ugR42cPm/product";
    var appURL = firebaseURL + environment + "/" + dataStore + "/" + data +".json?auth="+ authKey;
    //var all_appURL = firebaseURL + environment + "/" + dataStore ;
    //https://onetouch-d52d4.firebaseio.com/dev/request/-KkidwRuc2de6rQwz-mO/product.json?auth=ve8PdopndzS3yD35SMF6KAd4VKpHQuxUotXNeHGw
     $http.get(appURL).
     then(function(response) {
      $scope.products = response.data;

      //<---product.html----->
      $scope.product = $scope.products;
      $scope.getProduct = function (id) {
          for (var i = 0; i < $scope.product.length; i++) {
              if ($scope.product[i].id == id)
                  return $scope.product[i];
          }
          return null;

      }
      if ($routeParams.id != null) {
          $scope.product = $scope.getProduct($routeParams.id);
      }

      //pagination-->

       $scope.currentPage = 0;
       $scope.itemsPerPage = 8;
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
        //$scope.companyName=info.company.name;*/
    });

    });

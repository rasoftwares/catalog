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
app.controller('appController', function($scope, $http, $filter, $routeParams, DataService){
    //This debug flag enables, debugging details in the view layer.
    $scope.debug = false;

    $scope.companyName=info.company.name;
    $scope.pageTitle="Catalog";
    $scope.pageHeader="Product Catalog";
    $scope.search_title="Go";
    $scope.enableSearch = false;
    $scope.currentPage = 0;
    $scope.itemsPerPage = 8;
  //$scope.store = DataService.store;
    $scope.cart  = DataService.cart;
    $scope.products=[];




    $scope.firebaseURL = 'https://onetouch-d52d4.firebaseio.com/';
    $scope.environment = 'dev';
    $scope.dataStore = 'request';
    $scope.authKey = 've8PdopndzS3yD35SMF6KAd4VKpHQuxUotXNeHGw';
    $scope.data = "-KtQNH3Sf_ffvpoBLD-9/product";
    $scope.appURL = $scope.firebaseURL + $scope.environment + "/" + $scope.dataStore + "/" + $scope.data +".json?auth="+ $scope.authKey;
    //var all_appURL = firebaseURL + environment + "/" + dataStore ;
    //https://onetouch-d52d4.firebaseio.com/dev/request/-KkidwRuc2de6rQwz-mO/product.json?auth=ve8PdopndzS3yD35SMF6KAd4VKpHQuxUotXNeHGw

    $scope.getProducts = function(appURL){

        $http.get($scope.appURL).then(function(response){

                            $scope.products = response.data;


                            $scope.getProduct = function (id) {
                              console.log($scope.product);
                                  for (var i = 0; i < $scope.product.length; i++) {
                                      if ($scope.products[i].id == id)
                                          return $scope.product[i];
                                  }
                                return null;
                              }
                              if ($routeParams.id != null) {
                                  $scope.product = $scope.getProduct($routeParams.id);
                              }


                            //<---pagination-->
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
                        }).catch(function(){
                            console.log("Failed");
                             $scope.status = 'Failed...';
                           });


    };


});

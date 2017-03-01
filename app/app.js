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

app.factory("DataService", function () {

    // create store
    var myStore = new store();

    // create shopping cart
    var myCart = new shoppingCart("CatalogApp");

    // return data object with store and cart
    return {
        store: myStore,
        cart: myCart
    };
});


// Routing logic ends



app.controller('appController', ['$scope', '$http','$filter', function ($scope,$http,filteredListService,$filter) {


      $scope.pageTitle="Catalog";
      $scope.pageHeader="Product Catalog";
      $scope.search_title="Go";
      $scope.enableSearch = false;
      $scope.menuItems = [{"name":"Home", "url": "/", "onClick":"home", "visible" : true},
                        {"name":"Settings", "url": "", "onClick":"", "visible" : true},
                      {"name":"cart", "url": "/cart", "onClick":"cart", "visible" :true}

                 ];
      //  $scope.subHeader=info.company.name;
      //$scope.companyName=info.company.name;

}]);

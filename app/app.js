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
      when('/checkout', {
        templateUrl:  src_dir +'checkout.html',
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

    $scope.products;
    $scope.product;



//    var authHeaders = {"Authorization": "Basic ","Access-Control-Allow-Origin":"**"};
    var firebase = {
        'url' : 'https://onetouch-d52d4.firebaseio.com/',
        'environment' : 'dev',
        'dataStore' : 'request',
        'authKey' : 've8PdopndzS3yD35SMF6KAd4VKpHQuxUotXNeHGw',
        'data' : '-KtQNH3Sf_ffvpoBLD-9/product'
    };
      $scope.appURL= "http://localhost:9000/rest/inventory";
    //$scope.appURL="https://api.myjson.com/bins/dgzur";
    //$scope.appURL = firebase.url + firebase.environment + "/" + firebase.dataStore + "/" + firebase.data +".json?auth="+ firebase.authKey;

    //This ID is used to pass the current product id between home to product screen.
    $scope.currentProductID = 0;

    $scope.setCurrentProductID = function(id) {
        $scope.currentProductID = id;
    };

    $scope.getProduct = function (id) {
        if($scope.debug)
            console.log("getProudct() ------>" + "currentProductID - " + $scope.currentProductID);

        var arr = $scope.products[0];

        for (var i = 0; i < arr.length; i++) {
          if (arr[i].id == id) {
                $scope.product = arr[i];
          }
        }
    }

    $scope.getNetAmount = function(price, discount) {
        return price - price * discount/100;
    };

    $scope.getSavedAmount = function(price, discount){
        return (price) - (price - price * discount/100);
    };
    $scope.getProducts = function(appURL) {
        if($scope.debug)
            console.log("getProudcts() ------>" + "currentProductID - " + $scope.currentProductID);

        $http.get($scope.appURL,{
      	headers: {
	    'Access-Control-Allow-Origin': '**',
	    }}).then(function(response) {

          $scope.products = response.data;
          console.log($scope.products);

          /*if ($routeParams.id != null) {
              $scope.product = $scope.getProduct($routeParams.id);
          }*/
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
              console.log("call to url " + $scope.appURL  + " Failed");
             $scope.status = 'call to url  ' + $scope.appURL  + ' Failed';
        });
    };




});



/*var username = "admin";*
var password = "password";

var url = 'http://localhost:9000/admin/password/rest/inventory/';
$.ajax({
    url: url,
    success: function(json) {
        alert("Success", json);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
       alert(textStatus, errorThrown);
    },
    beforeSend: function (xhr) {
      xhr.setRequestHeader ("Authorization", "Basic " + btoa(username + ":" + password));
  	}
});*/

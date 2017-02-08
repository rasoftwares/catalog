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


var a = {
    "company": {
        "name": "AVRS Designer Sarees",
        "title": "",
        "registrationno": "",
        "registrationyear": "",
        "shortdescription": "",
        "owner": {
            "name": "",
            "photograph": ""
        }
    },
    "Contact": {
        "registeredaddress": "",
        "officeaddress": "",
        "landlinenumber": "",
        "mobilenumber": "",
        "emailid": ""
    },
    "website": {
        "websiteid": "",
        "aboutcompany": "",
        "aboutbussiness": ""
    },
    "gallery": [{
        "image": ""
    }, {
        "image": ""
    }, {
        "image": ""
    }],
    "product": [{
        "id": "1",
        "name": "Saree",
        "image": "1",
        "price": "1750",
        "discount": "500",
        "type": "cotton"
    },  {
            "id" :"1",
             "name" :"Saree",
             "image" : "1",
             "price" :"1750",
             "discount":"500",
             "type" : "cotton"
         },
         {
             "id" :"2",
             "name" :"Halfsaree",
             "image" : "2",
             "price" :"1750",
             "discount":"500",
             "type" : " cotton"

       },
         {
             "id" :"3",
             "name" :"Halfsaree",
             "image" : "3",
             "price" :"2750",
             "discount":"500",
             "type" : " cotton "

       },

        {
             "id" :"4",
             "name" :"Halfsaree",
             "image" : "4",
             "price" :"5750",
             "discount":"500",
             "type" : " cotton "

       },
         {
             "id" :"5","name" :"Halfsaree",
             "image" : "2",
             "price" :"1750",
             "discount":"500",
             "type" : " fancy"

       },
         {
             "id" :"6","name" :"Halfsaree",
             "image" : "5",
             "price" :"9550",
             "discount":"500",
             "type" : "working "

       },
         {
             "id" :"7","name" :"Halfsaree",
             "image" : "4",
             "price" :"7750",
             "discount":"500",
             "type" : "fancy"

       },
         {
             "id" :"8","name" :"Halfsaree",
             "image" : "2",
             "price" :"2750",
             "discount":"500",
             "type" : "cotton"
        }
,
         {
             "id" :"9","name" :"Chudithar",
             "image" : "2",
             "price" :"1000",
             "discount":"200",
             "type" : "cotton chudithar"
        }],
    "services": {
        "servicename": "",
        "description": "",
        "brandimageicon": "",
        "copyright": "",
        "applicationtype": "",
        "category": "",
        "type": "",
        "item": "",
        "summary": ""
    }
};

app.controller('appController', ['$scope', '$http', function ($scope, $http) {
	   $scope.productList = a.product;

    $scope.pageTitle="Catalog";
    $scope.pageHeader="Product Catalog";
    

}]);

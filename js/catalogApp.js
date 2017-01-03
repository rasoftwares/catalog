var app = angular.module('catalogApp', ['ngRoute']);


var a = [
         {
            "id" :"1",
        	 "name" :"Saree",
        	 "image" : "1",
			 "price" :"1750",
			 "discount":"500",
        	 "type" : "cotton"
         },
         {
        	 "id" :"2",
             "name" :"Halfsare e",
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
        }
	];

app.controller('catalogCtrl', ['$scope', '$http', function ($scope, $http) {
	$scope.productList = a;

    $scope.pageTitle="Catalog";
    $scope.pageHeader="Product Catalog";


}]);

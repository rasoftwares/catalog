var app = angular.module('onetouchApp', ['ngRoute']);


var a = [
         {
            "company" :{
                "name":"",
                "registrationNumber": "",
                "registeredYear":"2015"
            },
        	 "owner":{
                "name":"",
                "photograph" : ""
             },
             "contact" :{
                "registeredAddress" : "",
                "officeAddress" : "",
                "landlineNumber":"",
                "mobileNumber":"",

             },
             "website":"",
             "aboutCompany":"",
             "aboutBusiness":"",
             "gallery" :{
                "images":""
             },
             "products" :{
                "name" : "",
                "price" : "",
                "discount" : ""
             },
             "services" : [
                { "name" : "","description" : "" }
             ],
        	 "brandImageIcon" : "1",
        	 "copyright" : ""
         }
	];

app.controller('onetouchCtrl', ['$scope', '$http', function ($scope, $http) {
	$scope.productList = a;

    $scope.pageTitle="One Touch Apps";
    $scope.pageHeader="One Touch Apps";
    $scope.pageSubHeader="in 5 Minues";


}]);

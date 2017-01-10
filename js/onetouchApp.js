var app = angular.module('onetouchApp', ['ngRoute']);


var a = [
         {
            "company" :{
                "name":"",
                "titile":"",
                "shortDescription":"",
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
                "emailId":""

             },
             "website":"",
             "aboutCompany":"",
             "aboutBusiness":"",
             "gallery" :{
                "image":[{"name":"url"},
                        {"name":"url"}]
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
        	 "copyright" : "",
             "applicationType":"",
             "Category":"",
             "Type":"",
             "Item":"",
             "Summary":""

         }
	];

app.controller('onetouchCtrl', ['$scope', '$http', function ($scope, $http) {
	$scope.productList = a;

    $scope.pageTitle="Apps";
    $scope.pageHeader="Apps";
    $scope.pageSubHeader="";


}]);

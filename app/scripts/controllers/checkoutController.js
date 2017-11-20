app.controller('checkoutController', function($scope,$http,$filter,$routeParams,DataService){
//$scope.store = DataService.store;
  $scope.cart  = DataService.cart;
  $scope.pageTitle="catalogApp";
  $scope.getDate = function () {
       var today = new Date();
       var mm = today.getMonth() + 1;
       var dd = today.getDate();
       var yyyy = today.getFullYear();
       var date = dd + "/" + mm + "/" + yyyy
       return date
   };
});

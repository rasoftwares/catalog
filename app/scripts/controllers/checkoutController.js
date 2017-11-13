app.controller('checkoutController', function($scope,$http,$filter,$routeParams,DataService){
//$scope.store = DataService.store;
  $scope.cart  = DataService.cart;
  $scope.pageTitle="catalogApp";
});

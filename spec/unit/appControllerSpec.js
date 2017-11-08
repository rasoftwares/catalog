describe('Application Controller', function() {

	var $scope;
	var ctrl;
	var firebase_URL = 'https://onetouch-d52d4.firebaseio.com/dev/request/-KtQNH3Sf_ffvpoBLD-9/product.json?auth=ve8PdopndzS3yD35SMF6KAd4VKpHQuxUotXNeHGw';

    beforeEach(module('catalogApp'));

    beforeEach(inject(function($controller, $injector){
		$scope =  $injector.get('$rootScope');
		ctrl = $controller('appController', {$scope: $scope});
	}));


    describe('Configurations', function(){
            it('should define page title',function(){
                expect($scope.pageTitle).toBe('Catalog');
            });

            it('should define page Header', function(){
                expect($scope.pageHeader).toBe('Product Catalog');
            });

            it('should have disabled search feature', function(){
                expect($scope.enableSearch).toBe(false);
            });

            it('should have search title', function(){
                expect($scope.search_title).toBe('Go');
            });

            it('should have appropriate firebase details', function() {
                expect($scope.appURL).toBe(firebase_URL);
            });

            it('should validate a product with the discounted price', function() {
                //TODO:

            });
            it('should validate a product without discount price', function() {
                //TODO:
            });
            it('should validate setCurrentProductID()', function() {
                $scope.setCurrentProductID(1);
                expect($scope.currentProductID).toBe(1);
            });

            it('should get the right product from the array by getProduct()', function() {
                 var response = [[
                                     {"discount":"0","id":"1","image":"1","inventory":{},"itemcode":"0001","itemname":"Saree","name":"Saree","price":"1750","type":"Cotton Saree"},
                                     {"discount":"15","id":"2","image":"2","inventory":{},"itemcode":"0002","itemname":"Banaras Saree","name":"Banaras Saree","price":"1750","type":"Cotton Saree"}
                                     ]];
                $scope.products = response;
                $scope.setCurrentProductID(1);
                $scope.getProduct(1);
                expect($scope.product.id).toBe("1");
                expect($scope.product.discount).toBe("0");

                $scope.getProduct(2);
                expect($scope.product.id).toBe("2");
                expect($scope.product.discount).toBe("15");
            });


            /*
            -- adhoc testing can be done here
            it('Simple experiments', function() {
                var arr1 = {"name":"name-1",
                            "data":[{"data":"data-1"},{"data":"data-2"}]};
                console.log(angular.isObject(arr1));
                console.log(arr1.length + ":" + Array.isArray(arr1));
                console.log(arr1.data.length + ":" + Array.isArray(arr1.data));

            });*/
    });
});
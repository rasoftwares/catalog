describe('Application Controller', function() {

	var $scope;
	var ctrl;
	var firebase_URL = 'https://onetouch-d52d4.firebaseio.com/dev/request/-KtQNH3Sf_ffvpoBLD-9/product.json?auth=ve8PdopndzS3yD35SMF6KAd4VKpHQuxUotXNeHGw';
    beforeEach(module('catalogApp'));

    beforeEach(inject(function($controller, $injector){
		$scope =  $injector.get('$rootScope');
		ctrl = $controller('appController', {$scope: $scope});

		var mock_response = [[
                             {"discount":0,"id":"1","image":"1","inventory":{},"itemcode":"0001","itemname":"Saree","name":"Saree","price":1750,"type":"Cotton Saree"},
                             {"discount":15,"id":"2","image":"2","inventory":{},"itemcode":"0002","itemname":"Banaras Saree","name":"Banaras Saree","price":1750,"type":"Cotton Saree"}
                             ]];
        $scope.products = mock_response;

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

            it('should validate getNetAmount() for various discounts', function() {

                //Valiate for 0 discount
                $scope.getProduct(1)
                expect($scope.getNetAmount($scope.product.price, $scope.product.discount)).toBe(1750);

                //Valiate for 15% discount
                $scope.getProduct(2)
                expect($scope.getNetAmount($scope.product.price, $scope.product.discount)).toBe(1487.5);

                expect($scope.getNetAmount($scope.product.price, $scope.product.discount)).not.toBe(1500);

                expect($scope.getNetAmount(0,0)).toBe(0);
                expect($scope.getNetAmount(1000,100)).toBe(0);
                expect($scope.getNetAmount(100,50)).toBe(50);
                expect($scope.getNetAmount(100,75)).toBe(25);
                expect($scope.getNetAmount(-11234,100)).toBeFalsy();
                expect($scope.getNetAmount('nothing','nothing')).toBeNaN();

            });

            it('should validate getSavedAmount() for various discounts', function() {

                //Valiate for 0 discount
                $scope.getProduct(1)
                expect($scope.getSavedAmount($scope.product.price, $scope.product.discount)).toBe(0);

                //Valiate for 15% discount
                $scope.getProduct(2)
                expect($scope.getSavedAmount($scope.product.price, $scope.product.discount)).toBe(262.5);

                expect($scope.getSavedAmount($scope.product.price, $scope.product.discount)).not.toBe(300);

                expect($scope.getSavedAmount(0, 0)).toBe(0);
                expect($scope.getSavedAmount(1000, 100)).toBe(1000);
                expect($scope.getSavedAmount(100, 50)).toBe(50);
                expect($scope.getSavedAmount(100, 75)).toBe(75);
                expect($scope.getSavedAmount('nothing','nothing')).toBeNaN();

            });

            it('should get the right product from the array by getProduct()', function() {

                $scope.setCurrentProductID(1);
                $scope.getProduct(1);
                expect($scope.product.id).toBe("1");
                expect($scope.product.discount).toBe(0);

                $scope.getProduct(2);
                expect($scope.product.id).toBe("2");
                expect($scope.product.discount).toBe(15);
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

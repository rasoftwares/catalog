describe('Application Controller', function() {

	var $scope;
	var ctrl;
	var $routeParams;
	var environment="dev";
	var itemsPerPage=8;
	var currentPage = 0;

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

						it('should have search title', function(){
								expect($scope.search_title).toBe('Go');
						});

						it('should have environment', function(){
								 expect($scope.itemsPerPage).toBe(itemsPerPage);
						 });

						it('should have environment', function(){
								expect($scope.environment).toBe(environment);
						});

						it('should have environment', function(){
 							 expect($scope.currentPage).toBe(currentPage);
 					  });

						it('should have product length', function(){
						var products = [{
							"discount": "15",
							"id": "2",
							"image": "2",
							"name": "saree",
							"price": "1500",
							"type": "cotton"
						}, {
							"discount": "10",
							"id": "3",
							"image": "3",
							"name": "worksaree",
							"price": "2750",
							"type": "cotton"
						}];

						console.log(products.length);
   	        expect(products.length).toBe(2);
						});



	  });
});

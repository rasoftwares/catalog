describe('storeController', function() {

	var scope;
	var ctrl;

	beforeEach(module('catalogApp'));

	beforeEach(inject(function($rootScope, $controller){
		scope = $rootScope.$new();
		ctrl = $controller('StoreController',{
			$scope: scope
		});
	}));

  describe('Configurations in StoreController', function(){
		it('should define producttype',function(){
			expect(scope.products.length).toBe(23);
});
it('should define type of material',function(){
	expect(scope.products(0).discount).toBe('500');
});
    });
    });

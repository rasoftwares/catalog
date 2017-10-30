describe('Store Controller', function() {

	var scope;
	var ctrl;

beforeEach(module('catalogApp'));

beforeEach(inject(function($rootScope, $controller){
		scope = $rootScope.$new();
		ctrl = $controller('storeController',{
			$scope: scope
		});
	}));

describe('Configurations', function(){
		it('should define page title',function(){
			expect(scope.pageTitle).toBe('catalogApp');
		});
		it('should have an cart empty',function(){
			expect(scope.cart.saveItems.length).toBe(0);
		});

		it('should have an cart empty',function(){
 			expect(scope.cart.loadItems.length).toBe(0);
 		});

		it('should have addItem',function(){
     var item= {id: 8 ,image: "2.jpg", name: "saree", price: 5000 , discount: 500, quantity: 1}
			scope.cart.addItem(item)
			expect(scope.cart.items.length).toBe(0);
		});
    


		});
  });

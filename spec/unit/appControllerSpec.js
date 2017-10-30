describe('Application Controller', function() {

	var scope;
	var ctrl;

beforeEach(module('catalogApp'));

beforeEach(inject(function($rootScope, $controller){
		scope = $rootScope.$new();
		ctrl = $controller('appController',{
		$scope: scope
		});
	}));

describe('Configurations', function(){
		it('should define page title',function(){
			expect(scope.pageTitle).toBe('Catalog');
		});

		it('should define page Header', function(){
			expect(scope.pageHeader).toBe('Product Catalog');
		});

		it('should have disabled search feature', function(){
			expect(scope.enableSearch).toBe(false);
		});

		it('should have search title', function(){
			expect(scope.search_title).toBe('Go');
		});

		it('should have search title', function(){
			expect(scope.itemsPerPage).toBe(8);
		});


});
});

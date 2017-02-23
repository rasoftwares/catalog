describe('Application Controller ', function() {

	var scope;
	var ctrl;

	beforeEach(module('catalogApp'));

	beforeEach(inject(function($rootScope, $controller){
		scope = $rootScope.$new();
		ctrl = $controller('navController',{
			$scope: scope
		});
	}));

	describe('Configurations in app.js', function(){
		it('should define page title',function(){
			expect(scope.pageTitle).toBe('Catalog');
		});

		it('should define page Header', function(){
			expect(scope.pageHeader).toBe('Product Catalog');
		});

		it('should have disabled search feature', function(){
			expect(scope.enableSearch).toBe(false);
		});

		it('should have declared search title', function(){
			expect(scope.search_title).toBe('GO');
		});

	});

});

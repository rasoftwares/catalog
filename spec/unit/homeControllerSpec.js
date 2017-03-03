describe('Application Controller ', function() {

	var scope;
	var ctrl;

	beforeEach(module('catalogApp'));

	beforeEach(inject(function($rootScope, $controller){
		scope = $rootScope.$new();
		ctrl = $controller('appController',{
			$scope: scope
		});
	}));
	
  describe('Configurations in generalController', function(){
		it('should define producttype',function(){
			expect(scope.products.length).toBe(23);

		});
    });
    });

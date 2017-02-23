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

		it('should have menuItems', function(){
			expect(scope.menuItems.length).toBe(3);
		});
		it('should validate the contents of menu items', function(){
			var arr=['Home','Settings','cart'];
			var mItems = scope.menuItems;
			var flag = true;
			_.each(mItems,function(value,idx,array){
					_.each(arr,function(v,id,a){
							if(v == value.name){
								flag = true;
							}
					});
					expect(flag).toBe(true);
			});
		it('should have currentPage', function(){
			expect(scope.currentPage).toBe(0);
		});
		it('should have itemsPerPage', function(){
			expect(scope.itemsPerPage).toBe(8);
		});

	});
	});
		});

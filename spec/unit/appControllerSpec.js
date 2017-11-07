describe('Application Controller', function() {

	var $scope;
	var ctrl;

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
    });
});

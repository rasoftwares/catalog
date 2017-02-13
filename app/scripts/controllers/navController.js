angular.module('catalogApp').controller('navController', function($scope){
//$scope.applicationName = 'catalogApp';
  //$scope.search_title="Go";

  /* Dynamic menu and it's properties */
  $scope.menuItems = [{"name":"Home", "url": "/", "onClick":"home", "visible" : false},
                    {"name":"Settings", "url": "", "onClick":"", "visible" : true},
                    {"name":"List", "url": "/list", "onClick":"list", "visible" :false},
                    {"name":"View", "url": "/view", "onClick":"view", "visible" :false}
             ];

  //enable Search form field if the below setting is set to true
//  $scope.enableSearch = false;

  //$scope.settings = function(){ };

});

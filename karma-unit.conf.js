module.exports = function(config){
   config.set({
      frameworks: ['jasmine'],
      browsers: ['Chrome'],
      files: [
        'components/',
        'components/jquery.min.js',
        'components/underscore-min.js',
        'components/angular/angular.min.js',
        'components/angular/angular-mocks.js',
        'components/angular/angular-route.min.js',
        'components/bootstrap/js/bootstrap.min.js',
        'components/bootstrap/css/bootstrap.min.css',
        'app/scripts/data/info.js',
        'app/app.js',
        'app/scripts/controllers/*.js',
        'app/scriptis/views/*.html',
        'spec/unit/*.js'
      ]
   });

};

module.exports = function(config){
   config.set({
      frameworks: ['jasmine'],
      browsers: ['Chrome'],
      files: [
        'components/',
        'components/jquery.js',
        'components/jquery.min.js',
        'components/underscore-min.js'
        'components/angular/angular.min.js',
        'components/angular/angularfire1.2.0.min.js',
        'components/angular/angular-route.min.js',
        'components/angular/angular-min.js',
        'components/bootstrap/js/bootstrap.min.js',
        'components/bootstrap/css/bootstrap.min.css'
        'components/firebase/firebase2.2.4.js',
       //'components/forms/dynamic-forms.js',
        'app/scripts/data/info.js',
        'app/*.js',
        'app/scripts/controllers/*.js',
        'app/views/app.js'
      //  'spec/unit/*.js'
      ]
   });

};

module.exports = function(config){
  config.set({
    basePath : '..',
    files : [
      //frameworks first (and angular before ng-mocks)
      'bower_components/angular/angular.min.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/underscore/underscore-min.js',

      // then application code
      'src/js/polyfills.js',
      'src/js/weddingNames.js',
      'src/js/Invitations.js',
      'src/js/liveSearchAngular.js',

      // then spec files
      'testing/weddingNamesSpec.js',
      'testing/liveSearchTestingData.js',
      'testing/liveSearchSpecFile.js'

    ],

    autoWatch : false, // grunt can take care of this.

    frameworks : ['jasmine'],

    browsers : ['PhantomJS'],

    reporters: ['progress'], //this is a default.

    plugins :  [ // like grunt, karma needs these.
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-phantomjs-launcher'
    ]

  });};

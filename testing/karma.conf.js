module.exports = function(config){
  config.set({
    basePath : '..',
    files : [
      //frameworks first (and angular before ng-mocks)
      'site/js/dependencies/angular.min.js',
      'testing/angular-mocks.js',
      'site/js/dependencies/underscore-min.js',

      // then application code
      'site/js/weddingNames.js',
      'site/js/liveSearchAngular.js',

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

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! cheekyTeak JS Apps */\n',
    // Task configuration.
    // Quality Tools
    karma: {
      unit: {
        configFile: 'testing/karma.conf.js',
        singleRun: true
      }
    },
    jshint: {
      all: ['Gruntfile.js',
        'application/liveSearchAngular.js',
        'testing/liveSearchSpecFile.js',
        'testing/karma.conf.js'
      ]
    },
    // CSS Tools
    sass: {
      options: {
        outputStyle: 'compressed',
        sourceMap: true
      },
      dist: {
        files: {
          'dist/css/demoStyles.min.css': 'src/css/demoStyles.scss',
        }
      }
    },
    cssmin: {
      dist: {
        files: {
          'dist/vendor/normalize.min.css': 'bower_components/normalize-css/normalize.css'
        }
      }
    },
    //Javascript dist
    uglify: {
      dist: {
        options: {
          sourceMap: true,
          screwIE8: true, //best. line. ever.
          preserveComments: false,
        },
        files: {
          'dist/js/ctUtils.min.js': ['src/js/polyfills.js', 'src/js/weddingNames.js'],
          'dist/js/liveSearch.min.js': ['src/js/liveSearchAngular.js']
        }
      }
    },
    //Build Distribution html and images
    copy: {
      setup: {
        files : [
          {expand: true, cwd: 'bower_components/angular/', src: ['angular.min.js'], dest: 'dist/vendor/', filter: 'isFile'},
          {expand: true, cwd: 'bower_components/underscore/', src: ['underscore-min.js'], dest: 'dist/vendor/'}
        ]
      },
      htmlserver: {
        files: [
          {expand: true, cwd: 'src/', src:['*.html'], dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'src/', src:['imgs/*'], dest: 'dist/', filter: 'isFile'},
          ]
      }
    },
    // Development Server
    connect: {
      server: {
        options: {
          base: 'dist'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      js: {
        files: ['src/js/*.js'],
        tasks: ['jshint', 'uglify']
      },
      sass: {
        files: ['src/css/*.scss'],
        tasks: ['sass']
      },
      html: {
        files: ['src/*.html', 'src/imgs/*'],
        tasks: ['copy:htmlserver']
      }
    }


  });

  // Load the Plugins from NPM.
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint','karma', 'sass', 'cssmin', 'copy', 'uglify']);
  grunt.registerTask('test', ['jshint', 'karma']);
  grunt.registerTask('build', ['sass', 'cssmin', 'copy', 'uglify']);
  grunt.registerTask('dev', ['connect', 'watch']);

};

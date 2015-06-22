module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // HTML Validation Task Configuration
    validation: {
      options: {
        charset: 'utf-8',
        doctype: 'HTML5',
        failHard: false,
        reset: true,
        relaxerror: [
          'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
          'Empty heading.',
          'Bad value'
        ]
      },
      files: {
        src: [ '*.html' ]
      }
    },

    // JS Validation Task Configuration
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },

    
    // LESS Configuration
    less: {
      compileCore: {
        options: {
          strictMath: true
        },
        files: {
          'css/style.css': 'less/style.less'
        }
      }
    },

    // CSS Lint Configuration
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      src: ['css/style.css']
    },

    // Connect Static Server Configuration
    connect: {
      server: {
        options: {
          port: 3000,
          base: '.'
        }
      }
    },

    //Watch and LiveReload configuration
    watch: {
      css: {
        files: [ 'less/bootstrap/*.less'], 
        tasks: ['less'],
        options: {
          livereload: true,
        }
      },
      html: {
        files: ['*.html'],
        tasks: ['validation'],
        options: {
          livereload: true,
        }
      }
    }

  });


 /*
  *  This section is where we require the necessary plugins.
  *
  *  Let's be elegant and just tell Grunt
  *  to read our package.json devDependencies:
  */
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});


 /*
  *  This section is where we setup the Grunt tasks
  */

  // HTML validation task
  grunt.registerTask('validate-html', ['validation']);

  // Process Javascript
  grunt.registerTask('process-js', ['jshint']);

  // Lint CSS
  grunt.registerTask('validate-css', ['csslint']);

  // Default Task (drives LiveReload)
  grunt.registerTask('default', [ 'validation', 'connect', 'watch' ]);

};

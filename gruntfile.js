"use strict";

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
          'public/app/app.js'
          , 'public/app/**/*init.js'
          , 'public/app/**/*.js'
        ],
        dest: 'public/output/js/application.js'
      },
      vendors: {
        src: [
          'public/vendors/jquery/jquery.js'
          , 'public/vendors/lodash/dist/lodash.js'
          , 'public/vendors/bootstrap/dist/js/bootstrap.js'
          , 'public/vendors/redactor/redactor.js'
          , 'public/vendors/toastr/toastr.js'
          , 'public/vendors/redactor/redactor.js'
          , 'public/vendors/angular/angular.js'
          , 'public/vendors/angular-route/angular-route.js'
          , 'public/vendors/angular-redactor/angular-redactor.js'
          , 'public/vendors/angular-bootstrap/ui-bootstrap-tpls.js'
          , 'public/vendors/angular-promise-tracker/promise-tracker.js'
          , 'public/vendors/angular-cookies/angular-cookies.js'
          , 'public/vendors/angular.flashr/src/angular-flashr.js'
        ],
        dest: 'public/output/js/vendors.js'
      }
    },
    less: {
      development: {
        options: {
          paths: ["public/css/**/*", "public/vendors/bootstrap/less/*"]
        },
        files: {
          "public/output/css/app.css": "public/css/app.less"
        }
      }
    },
    watch: {
      scripts: {
        files: ['public/app/**/*' ],
        tasks: ['concat']
      },
      less: {
        files: ['public/css/**/*'],
        tasks: ['less']
      },
      files: ['public/output/**/*', 'public/index.html'],
      options: {
        livereload: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['watch', 'concat', 'less', 'watch:livereload']);
}
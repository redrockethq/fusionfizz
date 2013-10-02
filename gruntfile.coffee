module.exports = (grunt) ->
  grunt.initConfig(
    pkg: grunt.file.readJSON('package.json')
    concat:
      dist:
        src: [
          'public/app/app.js'
        , 'public/app/**/_init.js'
        , 'public/app/**/*.js'
        ]
        dest: 'public/js/application.js'
      vendors:
        src: [
          'public/libs/jquery/jquery.js'
        , 'public/libs/lodash/dist/lodash.js'
        , 'public/libs/bootstrap/dist/js/bootstrap.js'
        , 'public/libs/redactor/redactor.js'
        , 'public/libs/toastr/toastr.js'
        , 'public/libs/angular/angular.js'
        , 'public/libs/angular-route/angular-route.js'
        , 'public/libs/angular-promise-tracker/promise-tracker.js'
        , 'public/libs/angular.flashr/src/angular-flashr.js'
        ]
        dest: 'public/js/vendors.js'
    watch:
      scripts:
        files: ['public/app/**/*' ]
        tasks: ['concat']
      files: ['public/js/*.js', 'public/css/*.css', 'public/app/**/*', 'app/views/*.ejs']
      options:
        livereload: true
  )

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-concat'

  grunt.registerTask('default', ['concat', 'watch', 'watch:livereload'])

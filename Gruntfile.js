module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js',
              'public/js/**/*.js',
              '!public/js/jq/**/*.js',
              '!public/js/lib/**/*.js'],
    },
    watch: {
      scripts: {
        files: ['Gruntfile.js',
                'public/js/**/*.js',
                '!public/js/jq/**/*.js',
                '!public/js/lib/**/*.js'],
        tasks: ['jshint'],
        options: {
          spawn: false
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['watch']);
};

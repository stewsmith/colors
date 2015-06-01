//require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks
module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'public/stylesheets/style.css': 'public/stylesheets/style.scss'
        }
      }
    },

    express: {
      default_option: {}
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-express');

  grunt.registerTask('default', ['sass', 'express', 'express-keepalive']);
};

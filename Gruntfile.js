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

    nodemon: {
      default_option: {}
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['sass', 'nodemon']);
};

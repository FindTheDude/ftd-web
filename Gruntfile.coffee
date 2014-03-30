module.exports = (grunt) ->
  configuration =
    config:
      files: grunt.file.readJSON('grunt/files.json')

  require('time-grunt')(grunt)
  require('load-grunt-config')(grunt, configuration)
module.exports = (grunt) ->
  grunt.registerTask 'wait', () ->
    grunt.log.ok 'Waiting for server reload....'
    done = this.async();
    timeout = ->
      grunt.log.writeln('Done waiting!');
      done();
    setTimeout(timeout, 500)
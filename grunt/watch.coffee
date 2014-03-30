module.exports =
  templates:
    files: ['public/scripts/**/*.html']
    tasks: ['ngtemplates:build']
  js:
    files: [
      '<%=files.public.js.src%>'
      '<%=files.build.dir%>/templates/template.js'
    ]
    tasks: ['newer:jshint:public']
    options:
      livereload: true
  less:
    files: ['<%=files.public.less.src%>']
    tasks: ['less:build']
  gruntfile:
    files: [
      'Gruntfile.coffee'
      'grunt/*.*'
    ]
  livereload:
    files: [
      '{<%=files.build.dir%>, <%=files.public.dir%>}/style/{,*/}*.css'
      '<%=files.public.js.src%>'
      '<%=files.public.dir%>/**/*.html'
      '!<%=files.public.dir%>/vendor/**/*.*'
    ]
    options:
      livereload: true
  express:
    files: [
      '<%=files.server.js.src%>'
    ]
    tasks: ['newer:jshint:server', 'express:dev', 'wait']
    options:
      livereload: true
      nospawn: true
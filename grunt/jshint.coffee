module.exports =
  options:
    reporter: require('jshint-stylish')
  server:
    options:
      jshintrc: '<%=files.server.dir%>/.jshintrc'
    src: '<%=files.server.js.src%>'
  public:
    options:
      jshintrc: '<%=files.public.dir%>/.jshintrc'
    src: '<%=files.public.js.src%>'


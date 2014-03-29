module.exports =
  build:
    files: [{
      expand: true,
      cwd: '<%=files.build.dir%>/concat/scripts'
      src: '*.js'
      dest: '<%=files.build.dir%>/concat/scripts'
    }]
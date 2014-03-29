module.exports=
  dist:
    options:
      collapseBooleanAttributes: true
    files: [{
      expand: true
      cwd: '<%=files.public.dir%>'
      src: '*.html'
      dest: '<%=files.dist.dir%>/public'
    }]
module.exports=
  dist:
    files: [
      {
        expand: true
        dot: true
        dest: '<%=files.dist.dir%>/public'
        cwd: '<%=files.public.dir%>/public'
        src: [
          '*.{ico,png,txt}'
          'images/{,*/}*.{webp}'
          'fonts/**/*'
        ]
      }
      {
        expand: true
        dot: true
        dest: '<%=files.dist.dir%>/public/fonts'
        cwd: '<%=files.public.dir%>/vendor/bootstrap/dist/fonts'
        src: [
          '*.*'
        ]
      }
      {
        expand: true
        dot: true
        dest: '<%=files.dist.dir%>/public/fonts'
        cwd: '<%=files.public.dir%>/vendor/Font-Awesome/fonts'
        src: [
          '*.*'
        ]
      }
      {
        expand: true
        dot: true
        dest: '<%=files.dist.dir%>/server'
        cwd: '<%=files.server.dir%>'
        src: [
          '{,*/}*.js'
        ]
      }
    ]
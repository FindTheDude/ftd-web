module.exports =
  build:
    files: {
      '<%=files.dist.dir%>/public/scripts/{,*/}*.js'
      '<%=files.dist.dir%>/public/style/{,*/}*.css'
    }
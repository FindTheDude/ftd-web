module.exports =
  options:
    framework: 'jasmine2'
    launch_in_ci: ['PhantomJS']
    launch_in_dev: ['Chrome']
    debug: true
  public:
    src: [
      '<%=files.public.js.vendor%>'
      '<%=files.public.js.src%>'
      '<%=files.build.dir%>/templates/template.js'
      '<%=files.specs.vendor%>'
      '<%=files.public.js.specs%>'
    ]
    options:
      launch_in_ci: ['PhantomJS']
      launch_in_dev: ['Chrome']
  server:
    src: [
      '<%=files.server.js.src%>'
      '<%=files.specs.vendor%>'
      '<%=files.server.js.specs%>'
    ]
    options:
      launch_in_ci: ['PhantomJS']
      launch_in_dev: ['Chrome']
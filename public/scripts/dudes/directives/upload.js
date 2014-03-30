(function () {
    'use strict';

    angular.module('find-the-dude')
        .directive('upload', function () {
            return {
                restrict: 'A',
                replace: false,
                scope: {},
                templateUrl: 'scripts/dudes/views/upload.html',
                link: function (scope, element) {
                    var xhr = null;
                    var MAX_SIZE = 10485760;
                    var callbacks = {
                        load: function (event) {
                            if (event.target.status !== 200) {
                                console.log(event);
                                scope.$apply(function () {
                                    scope.started = false;
                                    scope.progress = 0;
                                });
                            }
                        },
                        error: function (event) {
                            console.log(event);
                        },
                        abort: function (event) {
                            console.log(event);
                            scope.started = false;
                            scope.progress = 0;
                        },
                        progress: function (event) {
                            scope.$apply(function () {
                                if (event.lengthComputable) {
                                    scope.progress = Math.round(event.loaded + 100 / event.total);
                                } else {
                                    scope.progress = 100;
                                }
                            });
                        }
                    };

                    var upload = function (files, url) {
                        var formData = new FormData();
                        for (var i in files) {
                            formData.append('photo', files[i]);
                        }
                        xhr = new XMLHttpRequest();
                        xhr.upload.addEventListener('progress', callbacks['progress'], false);
                        xhr.addEventListener('load', callbacks['load'], false);
                        xhr.addEventListener('error', callbacks['error'], false);
                        xhr.addEventListener('abort', callbacks['abort'], false);
                        xhr.open('POST', url);
                        xhr.send(formData);
                        scope.$apply(function () {
                            scope.started = true;
                        });
                    };

                    var processFiles = function(files, started) {
                        var filesToUpload = [];
                        scope.$apply(function() {
                            if(!started) {
                                for(var i=0; i < files.length; i++) {
                                    if(files.item(i).size <= MAX_SIZE) {
                                        filesToUpload.push(files.item(i));
                                    }
                                }
                            }
                        });

                        if(filesToUpload.length > 0) {
                            upload(filesToUpload, url);
                        }
                    };
                    var url = '/api/users/dudes';
                    scope.progress = 0;
                    scope.started = false;

                    var documentElement = angular.element(document.body);
                    var dropbox = element;
                    var inputElement = angular.element(angular.element(dropbox.children()[0]).children()[0]);

                    var dragEnterLeave = function(event) {
                        event.stopPropagation();
                        event.preventDefault();
                        dropbox.removeClass('drop-area-drag-over');
                    };

                    scope.openFileBrowser = function() {
                        inputElement[0].click();
                    };

                    dropbox.bind('dragenter', dragEnterLeave);
                    dropbox.bind('dragleave', dragEnterLeave);
                    dropbox.bind('dropover', function(event) {
                        event.stopPropagation();
                        event.preventDefault();
                        if(!scope.started) {
                            dropbox.addClass('drop-area-drag-over');
                        }
                    });

                    documentElement.bind('dragover drop', function(event) {
                        event.stopPropagation();
                        event.preventDefault();
                    });

                    dropbox.bind('drop', function(event) {
                        event.stopPropagation();
                        event.preventDefault();
                        processFiles(event.dataTransfer.files, scope.started);
                        dropbox.removeClass('drop-area-drag-over');
                    });

                    scope.fileChanged = function(element) {
                        processFiles(element.files, scope.started);
                    };

                    scope.showProgress = function() {
                        return scope.started;
                    };

                    scope.cancel = function() {
                        if(xhr) {
                            xhr.abort();
                        }
                    };
                }
            };
        });
})();
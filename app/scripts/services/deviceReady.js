'use strict';

angular.module('asistanApp').factory('deviceReady', function ($rootScope) {
    return function (fn) {
        if (DEVELOP) {
            return fn;
        }
        var queue = [];

        var impl = function () {
            queue.push(Array.prototype.slice.call(arguments));
        };

        document.addEventListener('deviceready', function () {
            queue.forEach(function (args) {
                fn.apply(this, args);
            });
            impl = fn;
        }, false);

        return function () {
            return impl.apply(this, arguments);
        };
    };
});

angular.module('hybridApp', ['list'])

    .controller('MainCtrl', function () {
        this.onSelected = function (event) {
            alert(event);
        }
    })

    .component('headerComponent', {
        template: '<p>ahoj ja jsem header</p>'
    });
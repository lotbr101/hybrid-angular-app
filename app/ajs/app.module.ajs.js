angular.module('hybridApp', ['list'])

    .controller('MainCtrl', function () {

        this.eventList = [];

        this.onSelected = function (event) {
            alert(event);
        }
    })

    .component('headerComponent', {
        templateUrl: 'app/ajs/tpl/header-component.html'
    });
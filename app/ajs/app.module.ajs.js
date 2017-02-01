angular.module('hybridApp', ['list', 'book-service'])

    .controller('MainCtrl', ['bookService', function (bookService) {

        var ctrl = this;

        ctrl.eventList = [];
        ctrl.books = [];

        ctrl.onSelected = function (event) {
            ctrl.eventList.push(event);
        }

        this.$onInit = function () {
            bookService.getAll().then(
                function (res) {
                    ctrl.books = res['books'];
                }
            )
        }
    }])

    .component('headerComponent', {

        bindings: {
            eventList: '<'
        },

        templateUrl: 'app/ajs/tpl/header-component.html'
    });
angular.module('hybridApp', ['list', 'book-service'])

    .controller('MainCtrl', ['bookService', function (bookService) {

        this.eventList = [];
        this.books = {};

        this.onSelected = function (event) {
            alert(event);
        }

        this.$onInit = function () {
            bookService.getAll().then(
                function (res) {
                    this.books = res['books'];
                },
                function (reason) {
                    console.log(reason);
                }
            )
        }
    }])

    .component('headerComponent', {
        bindings: {

        },

        templateUrl: 'app/ajs/tpl/header-component.html'
    });
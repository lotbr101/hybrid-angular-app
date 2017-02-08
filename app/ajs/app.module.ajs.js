angular.module('hybridApp', ['list', 'book-service'])

    .controller('MainCtrl', ['bookService', function (bookService) {

        var ctrl = this;

        ctrl.eventList = [];
        ctrl.books = [];

        ctrl.onSelected = function (event) {
            ctrl.eventList.push(event);
        };

        ctrl.onDeleteQuery = function (event) {
            event['showButtons'] = true;
            ctrl.eventList.push(event);
        };

        ctrl.doRollback = function (event) {
            event['showButtons'] = false;
            var newEvent = {eventType:'delete rollback', itemId: event.itemId, itemName: event.itemName};
            ctrl.eventList.push(newEvent);
        };

        ctrl.doCommit = function (event) {
            event['showButtons'] = false;
            var newEvent = {eventType:'delete commit', itemId: event.itemId, itemName: event.itemName};
            ctrl.eventList.push(newEvent);
            var index;
            for (var i = 0; i < ctrl.books.length; i++) {
                if (ctrl.books[i]['id'] === event.itemId) {
                    index = i;
                }
            }
            ctrl.books.splice(index, 1);
        };

        this.$onInit = function () {
            bookService.getAll().then(
                function (res) {
                    ctrl.books = res['books'];
                }
            )
        };
    }])

    .component('headerComponent', {

        bindings: {
            eventList: '<',
            onRollback: '&',
            onCommit: '&'
        },

        controller: function () {
            var self = this;

            self.rollback = function (e) {
                self.onRollback({item: e});
            };

            self.commit = function (e) {
                self.onCommit({item: e});
            }
        },

        templateUrl: 'app/ajs/tpl/header-component.html'
    });
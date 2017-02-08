angular.module('hybridApp', ['list', 'book-service'])

    .component('masterComponent', {

        controller: ['bookService', function (bookService) {

            var ctrl = this;

            ctrl.eventList = [];
            ctrl.books = [];

            /* this is the callback fn passed to the <list-component> directive in master-component.html */
            ctrl.onSelected = function (event) {
                ctrl.eventList.push(event);
            };

            /* this is the callback fn passed to the <list-component> directive in master-component.html */
            ctrl.onDeleteQuery = function (event) {
                event['showButtons'] = true;
                ctrl.eventList.push(event);
            };

            /* this is the callback fn passed to the <header-component> directive in master-component.html */
            ctrl.doRollback = function (event) {
                event['showButtons'] = false;
                var newEvent = {eventType: 'delete rollback', itemId: event.itemId, itemName: event.itemName};
                ctrl.eventList.push(newEvent);
            };

            /* this is the callback fn passed to the <header-component> directive in master-component.html */
            ctrl.doCommit = function (event) {
                event['showButtons'] = false;
                var newEvent = {eventType: 'delete commit', itemId: event.itemId, itemName: event.itemName};
                ctrl.eventList.push(newEvent);
                var index;
                for (var i = 0; i < ctrl.books.length; i++) {
                    if (ctrl.books[i]['id'] === event.itemId) {
                        index = i;
                    }
                }
                ctrl.books.splice(index, 1);
            };

            /* this is the callback fn passed to the <header-component> directive in master-component.html */
            ctrl.doClearEvents = function () {
                ctrl.eventList = []
            };

            /* $onInit is a safe place to fetch data */
            this.$onInit = function () {
                bookService.getAll().then(
                    function (res) {
                        ctrl.books = res['books'];
                    }
                )
            };
        }],

        /* we reference everything by prefixing it with "main"
        * in directive's template
        * this is to replace referencing via $scope
        * */
        controllerAs: 'main',
        templateUrl: 'app/ajs/tpl/master-component.html'
    })

    .component('headerComponent', {

        bindings: {
            eventList: '<',
            onRollback: '&',
            onCommit: '&',
            onClearEvents: '&'
        },

        controller: function () {
            var self = this;

            /* self.rollback is called from directive template */
            self.rollback = function (e) {
                /* onRollback is exposed as a directive output parameter
                   - see the bindings object
                   - see the directive used in master-component.html
                   - the callback fn which is passed tot this attribute must use the name "item"
                     to catch the emitted object, see master-component.html
                */
                self.onRollback({item: e})
            };

            self.commit = function (e) {
                self.onCommit({item: e})
            };

            self.clearEvents = function () {
                self.onClearEvents()
            }
        },

        templateUrl: 'app/ajs/tpl/header-component.html'
    });
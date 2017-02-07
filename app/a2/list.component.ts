import {Component, Input, EventEmitter, Output} from '@angular/core';
import {downgradeComponent} from '@angular/upgrade/static';
import IAngularStatic = angular.IAngularStatic;
declare let angular: IAngularStatic;

@Component({
    templateUrl: 'app/a2/tpl/list-component.html'
})

export class ListComponent {

    @Input() listData:Array<Object>;
    @Output() selected = new EventEmitter<Object>();
    @Output() deleteQuery = new EventEmitter<Object>();

    constructor() {}

    onSelected(id:number, name:string) {
        this.selected.emit({eventType:'select', itemId: id, itemName: name})
    }

    onDeleteQuery(id:number, name:string) {
        this.deleteQuery.emit({eventType:'delete query', itemId: id, itemName: name})
    }

}

angular.module('list', [])

.directive('listComponent',
    downgradeComponent({
        component: ListComponent,
        inputs: ['listData'],
        outputs: ['selected', 'deleteQuery']
    }) as angular.IDirectiveFactory);
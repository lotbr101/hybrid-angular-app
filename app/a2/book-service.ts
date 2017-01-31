import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {downgradeInjectable} from '@angular/upgrade/static';
import {Injectable} from "@angular/core";
import IAngularStatic = angular.IAngularStatic;

declare let angular: IAngularStatic;

@Injectable()
export class BookService {

    constructor (private http: Http) { }

    getAll() {
        return this.http.get('data/books.json').map((res) => res.json()).toPromise();
    }

}

angular.module('book-service', [])
    .factory('bookService', downgradeInjectable(BookService));

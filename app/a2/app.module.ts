import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {UpgradeModule} from '@angular/upgrade/static';
import {ListComponent} from "./list.component";
import {BookService} from "./book-service";
import {HttpModule} from "@angular/http";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        UpgradeModule
    ],
    declarations: [
        ListComponent
    ],
    providers: [
        BookService
    ],
    entryComponents: [
        ListComponent
    ]
})
export class AppModule {
    ngDoBootstrap() { }
}


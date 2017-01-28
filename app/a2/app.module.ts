import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {UpgradeModule} from '@angular/upgrade/static';
import {ListComponent} from "./list.component";

@NgModule({
    imports: [
        BrowserModule,
        UpgradeModule
    ],
    declarations: [
        ListComponent
    ]
})
export class AppModule {
    ngDoBootstrap() {
    }
}


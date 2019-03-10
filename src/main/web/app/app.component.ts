'use strict';

import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {HomeComponent} from './home/home.component';
import {DraftingComponent} from './drafting/drafting.component';

@Component({
    selector: 'app',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
        {path: '/home', name: 'HomePage', component: HomeComponent},
        {path: '/drafting', name: 'Drafting', component: DraftingComponent},
        {path: '/**', redirectTo: ['HomePage']}
])
export class AppComponent {
}

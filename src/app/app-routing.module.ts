import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmptyRouteComponent} from "./empty-route/empty-route.component";
import {APP_BASE_HREF} from "@angular/common";
import {PostDetailComponent} from "./post-detail/container/post-detail/post-detail.component";

const routes: Routes = [
    {
        path: ':id',
        component: PostDetailComponent
    },
    {
        path: '**', component: EmptyRouteComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        {provide: APP_BASE_HREF, useValue: '/post'}
    ]
})
export class AppRoutingModule {
}

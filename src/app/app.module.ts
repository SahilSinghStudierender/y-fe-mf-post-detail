import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './core/container/app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PostDetailComponent} from './post-detail/container/post-detail/post-detail.component';
import {CommentComponent} from './post-detail/component/comment/comment.component';
import {EditorComponent} from "./post-detail/component/editor/editor.component";
import {NgxEditorModule} from "ngx-editor";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent,
        PostDetailComponent,
        CommentComponent,
        EditorComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        NgxEditorModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

import {Component, Input} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {PostService} from "../../service/post.service";
import {FormControl, FormGroup} from "@angular/forms";
import {CommentDto} from "../../models/comment-dto";
import {CreateCommentDto} from "../../models/create-comment-dto";
import {Validators} from "ngx-editor";

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
    @Input() comments: CommentDto[] = [];
    @Input() postId: number;
    innerHtml = "";
    form = new FormGroup({
        editorContent: new FormControl("", Validators.required()),
    });

    constructor(private postService: PostService,
                // private toastService: AppToastService,
                public sanitizer: DomSanitizer) {
    }


    publishComment() {
        if (!this.form.valid) {
            Object.keys(this.form.controls).forEach(field => {
                const control = this.form.get(field);
                control?.markAsTouched({onlySelf: true});
            });
            return;
        }

        const commentToCreate: CreateCommentDto = {
            text: this.form.get("editorContent")!.value!,
            postId: this.postId
        };

        this.postService.createCommentForPost(commentToCreate).subscribe({
            next: (comment) => {
                // this.toastService.show({body: "Comment published!"});
                this.comments.push(comment);

                this.form.reset();
                Object.keys(this.form.controls).forEach(key => {
                    const control = this.form.get(key);
                    control?.markAsPristine();
                    control?.markAsUntouched();
                    control?.updateValueAndValidity();
                    control?.setErrors(null);
                });
            },
            error: (error) => {
                console.error("Could not publish comment", error);
                // this.toastService.show({body: "Could not publish comment, try again later!", error: true});
            },
        });
    }
}

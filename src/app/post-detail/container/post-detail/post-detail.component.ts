import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {PostDto} from "../../models/post-dto";
import {CommentDto} from "../../models/comment-dto";
import {DomSanitizer} from "@angular/platform-browser";
import {PostService} from "../../service/post.service";

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
    postId: number;
    paramError = false;
    post: PostDto;
    comments: CommentDto[] = [];
    loadingPost = false;
    loadingComments = false;

    constructor(private location: Location, private postService: PostService,
                // private toastService: AppToastService,
                public sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
        const path = this.location.path();
        const pathSegments = path.split('/');

        this.postId = Number(pathSegments[1])
        if(isNaN(this.postId)) {
            this.paramError = true;
        }

        this.loadingComments = true;

        this.postService.getPostById(this.postId).subscribe({
            next: (value) => {
                this.post = value;
                this.postService.getCommentOfPost(this.postId!).subscribe({
                    next: (comments) => {
                        this.comments = comments;
                    },
                    error: (err) => {
                        console.error(`Error on fetching comments for Post with id ${this.postId}`, err);
                    }
                });
            },
            error: (err) => {
                console.error(`Error on fetching Post with postId ${this.postId}`, err);
            },
            complete: () => {
                this.loadingPost = false;
                this.loadingComments = false;
            }
        });
    }
}

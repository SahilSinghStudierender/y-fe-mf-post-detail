import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {PostDto} from "../models/post-dto";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CommentDto} from "../models/comment-dto";
import {CreateCommentDto} from "../models/create-comment-dto";
@Injectable({
    providedIn: "root"
})
export class PostService {

    constructor(private http: HttpClient) {
    }


    public getPostById(postId: number): Observable<PostDto> {
        return this.http.get<PostDto>(`${environment.backendUrl}/posts/${postId}`);
    }

    public getCommentOfPost(postId: number): Observable<CommentDto[]> {
        return this.http.get<CommentDto[]>(`${environment.backendUrl}/comments/${postId}`);
    }

    public createCommentForPost(comment: CreateCommentDto): Observable<CommentDto> {
        return this.http.post<CommentDto>(`${environment.backendUrl}/comments`, comment);
    }
}

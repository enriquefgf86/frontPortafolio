import { PostServicesService } from './../../services/post-services.service';
import { DialogDataInterface } from './../../models/dialogDataInterface';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css'],
})
export class AddCommentComponent implements OnInit {
  idPost: string;
  commenting: string;
  constructor(
    private dialogRef: MatDialogRef<AddCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataInterface,
    private postService: PostServicesService
  ) {}

  ngOnInit(): void {
    this.postService.change.subscribe((result) => {
      console.log(result);
      this.idPost = result;
      console.log(this.idPost);

    });
  }

  async onClick() {
    await this.idPost;
    if (this.idPost) {
      this.postService
        .commentOnPost(this.idPost, this.commenting)
        .subscribe((result) => {
          console.log(result);
          console.log(this.idPost);
        });
      this.dialogRef.close(); // this.postService.commentOnPost()
    }
  }
}

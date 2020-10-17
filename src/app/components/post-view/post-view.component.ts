import { PostViewModel } from './../../models/PostViewModel';
import { PostServicesService } from './../../services/post-services.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddCommentComponent } from '../add-comment/add-comment.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css'],
})
export class PostViewComponent implements OnInit {
  idOfPost: string;
  postSelected: PostViewModel;
  comment: string;
  nameCommenter: string;

  @ViewChild('scrollTop') private myScrollContainer: ElementRef;
  // @ViewChild('cardComments')  hideShowComments: ElementRef;

  videos: string[] = [];
  images: string[] = [];
  show:boolean=false;
  panelOpenState = false;

  constructor(
    private postService: PostServicesService,
    private router: Router,
    private urlRoute: ActivatedRoute,
    private addCommentDialog: MatDialog,
    private fireStorage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    //console.log(this.show);

    this.idOfPost = this.urlRoute.snapshot.params['idPostView'];

    this.postService.getAPost(this.idOfPost).subscribe(async(result: any) => {
      //console.log(result);
      this.postSelected = result;
      for (let i = 0; i < result.videos.length; i++) {
        this.fireStorage
          .ref('videos/' + this.postSelected.id)
          .child(`${this.postSelected.text}-${result.id}-${i}`)
          .getDownloadURL()
          .subscribe((allVideos) => {
            //console.log(allVideos);

            this.videos.push(allVideos);
            //console.log(this.videos);
          });
      }
      for (let i = 0; i < result.images.length; i++) {
        this.fireStorage
          .ref('images/' + this.postSelected.id)
          .child(`${this.postSelected.text}-${result.id}-${i}`)
          .getDownloadURL()
          .subscribe((allImages) => {
            //console.log(allImages);

            this.images.push(allImages);
            //console.log(this.images);
          });
      }
      let objectIdImages=new Object();
      let images=this.images;
      let idPost=this.idOfPost;
      objectIdImages={images,idPost}
      //console.log(this.images,this.idOfPost);


    });


  }


  scrollToElement(): void {
    this.myScrollContainer.nativeElement.scroll({
      top: this.myScrollContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

  async addComment() {
    const data: any = {
      name: this.nameCommenter,
      comments: this.comment,
    };
    this.postService
      .commentOnPost(this.idOfPost, data)
      .subscribe(async (result) => {
        //console.log(result);
        await await this.postService
          .getAPost(this.idOfPost)
          .subscribe((result: any) => {
            //console.log(result);

            this.postSelected = result;
            this.scrollToElement();
          });
      });
  }

 async  seeFullCarousel(){
    await this.postService.imagesFromParent(this.images,this.idOfPost)
    this.router.navigate([`post/view/${this.idOfPost}/fullscreen/images`])
  }
}

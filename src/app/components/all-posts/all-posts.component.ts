import { take } from 'rxjs/operators';
import { AuthServicesService } from './../../services/auth-services.service';
import { PostServicesService } from './../../services/post-services.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { trigger, transition, animate, style } from '@angular/animations';
import { analytics } from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css'],
})
export class AllPostsComponent implements OnInit {
  @ViewChild('commentOverflow1', { static: true }) card: ElementRef;

  // counterForImageTransition = 0;

  allPortafolio: any[] = [];
  arrayOfVideos: any[] = [];
  arrayOfImages: any[] = [];
  randomNumber: number;
  allVideoPresentation: any[] = [];
  up: boolean[] = [];
  isAuth: boolean;
  loader: boolean;

  constructor(
    private postService: PostServicesService,
    private fireStorage: AngularFireStorage,
    private routes: Router,
    private authService: AuthServicesService
  ) {}

  // matchImage(post, image) {
  //   if (post.id === image.id) {
  //     return image.image;
  //   } else {
  //     return '../../../assets/white.jpg';
  //   }
  // }

  ngOnInit(): void {
    this.isAuth = this.authService.isUserLoggedIn().valueOf();
    this.loader = true;

    this.authService.authDetection.subscribe((result) => {
      this.isAuth = result;
    });

    this.arrayOfVideos;

    // setInterval(() => {
    //   this.counterForImageTransition =
    //     ++this.counterForImageTransition % this.arrayOfImages.length;
    // }, 5000);

    // if (this.card) {
    //   console.log(this.card);
    // }

    this.postService.getAllPosts().subscribe(async (result: any) => {
      // console.log(result);
      if (result) {
        this.loader = false;
      }

      await this.postService.changeWord.subscribe((search) => {
        //especificandose si no hay ningun proceso de busqueda pendientw
        // console.log(search);
        if (search) {
          this.postService
            .searchAPost(search)
            .subscribe((searchResult: any) => {
              this.allPortafolio = searchResult;
            });
        } else {
          this.allPortafolio = result;
        }
      });
      this.allPortafolio = result;

      for (let x = 0; x < result.length; x++) {
        var videosLoop = result[x];
        // console.log(videosLoop);
        if (videosLoop.videos == null) {
          // console.log('no videos');
        } else {
          this.allVideoPresentation.push(videosLoop.videos[0]);

          for (let i = 0; i < videosLoop.videos.length; i++) {
            this.fireStorage
              .ref('videos/' + result[x].id)
              .child(`${result[x].text}-${result[x].id}-${i}`)
              .getDownloadURL()
              .toPromise()
              .then((allVideos) => {
                // console.log(allVideos);

                this.arrayOfVideos.push(
                  (object = { video: allVideos, id: result[x].id })
                );
                // console.log(this.arrayOfVideos);
              })
              .catch((err) => {
                // console.log(err.code);
                if (err.code == 'storage/quota-exceeded') {
                  this.routes.navigate(['/quota-exceeded']);
                }
              });
          }
        }
      }
      let object = new Object();

      for (let x = 0; x < result.length; x++) {
        var imagesLoop = result[x];
        // console.log(imagesLoop);
        if (imagesLoop.images == null) {
          // console.log('no images');
        } else {
          for (let i = 0; i < imagesLoop.images.length; i++) {
            this.fireStorage
              .ref('images/' + result[x].id)
              .child(`${result[x].text}-${result[x].id}-${i}`)
              .getDownloadURL()
              .toPromise()
              .then((allImages) => {
                // console.log(allImages);

                this.arrayOfImages.push(
                  (object = { image: allImages, id: result[x].id })
                );
                // console.log(this.arrayOfImages);
              })
              .catch((err) => {
                // console.log(err.code);
                if (err.code == 'storage/quota-exceeded') {
                  this.routes.navigate(['/quota-exceeded']);
                }
              });
            // .subscribe((allImages) => {
            //   console.log(result[x].id);

            //   this.arrayOfImages.push(
            //     (object = { image: allImages, id: result[x].id })
            //   );
            //   // console.log(this.arrayOfImages);
            // });
          }
          this.randomNumber =
            Math.floor(Math.random() * this.arrayOfImages.length) + 0;
        }
      }
    });
  }

  async delete(postId: string) {
    await this.postService.deleteAPost(postId).subscribe((result) => {
      location.reload();
      // for (let x = 0; x < result.videos.length; x++) {
      //   this.fireStorage
      //     .ref('videos/' + postId)
      //     .child(postId + '-' + x)
      //     .delete()
      //     .then(() => {
      //       console.log('deleted in fire storage');
      //     });
      // }

      // for (let x = 0; x < result.images.length; x++) {
      //   this.fireStorage
      //     .ref('images/' + postId)
      //     .child(postId + '-' + x)
      //     .delete()
      //     .then(() => {
      //       console.log('deleted in fire storage');
      //     });
      // }
    });
  }
}

import { PostServicesService } from './../../services/post-services.service';
import { PostModel } from './../../models/postmodel';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  postCreation: FormGroup;

  arrayImg: any[] = [];
  arrayVideos: any[] = [];
  arrayImgMongoDb: any[] = [];
  arrayVideosMongoDb: any[] = [];

  postToCreate = new PostModel();
  @ViewChild('imagesUpload', { static: true }) input: ElementRef;
  arrayImagesTest: any[] = [];
  imgsSelected: any;
  videosSelected: any;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostServicesService,
    private router: Router,
    private createCollection: AngularFirestore,
    private imgUploader: AngularFireStorage,
    private videoUploader: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.initPostForm();
    console.log(this.input.nativeElement.files.name);
    console.log(this.imgsSelected);
  }

  async selectImgs(event: any) {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files);

      let filesImageAmmount = event.target.files.length;
      for (let i = 0; i < filesImageAmmount; i++) {
        const imageReader = new FileReader();
        imageReader.onload = async (imgCharger: any) => {
          this.arrayImg.push(imgCharger.target.result); //Para Guardar en Firebase
          this.arrayImgMongoDb.push(
            imgCharger.target.result.split(',')[1].slice(0, 15)
          ); //Para Guardar en mongo
          this.postCreation.patchValue({ imagesPost: this.arrayImgMongoDb }); //Slavando part del string en mongo
        };
        imageReader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  async selectVideos(event: any) {
    if (event.target.files && event.target.files[0]) {
      let filesVideosAmmount = event.target.files.length;
      for (let i = 0; i < filesVideosAmmount; i++) {
        const imageReader = new FileReader();
        imageReader.onload = async (videoCharger: any) => {
          console.log(videoCharger.target.result);
          this.arrayVideos.push(videoCharger.target.result); //Para Guardar en Firebase
          this.arrayVideosMongoDb.push(
            videoCharger.target.result.split(',')[1].slice(0, 15)
          ); //Para Guardar en mongo
          this.postCreation.patchValue({ videosPost: this.arrayVideosMongoDb }); //Slavando part del string en mongo
        };
        imageReader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  initPostForm() {
    this.postCreation = this.formBuilder.group({
      namePost: new FormControl('', Validators.compose([Validators.required])),
      descriptionPost: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      textPost: new FormControl('', Validators.compose([Validators.required])),
      techPost:new FormControl('', Validators.compose([Validators.required])),
      imagesPost: new FormControl(''),
      videosPost: new FormControl(''),
    });
  }

  createItem(data): FormGroup {
    return this.formBuilder.group(data);
  }

  setPost() {
    this.postToCreate.name = this.postCreation.get('namePost').value;
    this.postToCreate.description = this.postCreation.get(
      'descriptionPost'
    ).value;
    this.postToCreate.technologies = this.postCreation.get(
      'techPost'
    ).value;
    this.postToCreate.text = this.postCreation.get('textPost').value;
    this.postToCreate.images = this.postCreation.get('imagesPost').value;

    this.postToCreate.videos = this.postCreation.get('videosPost').value;
  }

  async createPost() {
    await this.setPost();
    await this.postService
      .createNewPost(this.postToCreate)
      .subscribe(async (result: any) => {
        console.log('post created ', result);
        if (!result.error) {
          this.router.navigate(['/']);

          const storageVideosPath = (await '/videos/') + result.id; //path al storage
          const storageImagesPath = (await '/images/') + result.id;

          for (let i = 0; i < this.arrayVideos.length; i++) {
            this.videoUploader
              .ref(storageVideosPath)
              .child(
                `${this.postToCreate.text}-${
                  result.id
                }-${this.arrayVideos.indexOf(this.arrayVideos[i])}`
              )
              .putString(this.arrayVideos[i].split(',')[1], 'base64', {
                contentType: 'video/mp4',
              })
              .snapshotChanges()
              .pipe(
                finalize(() => {
                  this.videoUploader
                    .ref(storageVideosPath)
                    .child(
                      `${this.postToCreate.text}-${
                        result.id
                      }-${this.arrayVideos.indexOf(this.arrayVideos[i])}`
                    )
                    .getDownloadURL()
                    .subscribe((urlVideo) => {
                      console.log(urlVideo);
                      this.postCreation.value.videosPost = urlVideo;
                    });
                })
              );
          }

          for (let i = 0; i < this.arrayImg.length; i++) {
            this.imgUploader
              .ref(storageImagesPath)
              .child(
                `${this.postToCreate.text}-${result.id}-${this.arrayImg.indexOf(
                  this.arrayImg[i]
                )}`
              )
              .putString(this.arrayImg[i].split(',')[1], 'base64', {
                contentType: 'image/jpeg',
              })
              .snapshotChanges()
              .pipe(
                finalize(() => {
                  this.imgUploader
                    .ref(storageImagesPath)
                    .child(
                      `${this.postToCreate.text}-${
                        result.id
                      }-${this.arrayImg.indexOf(this.arrayImg[i])}`
                    )
                    .getDownloadURL()
                    .subscribe((urlImg) => {
                      console.log(urlImg);
                      this.postCreation.value.imagesPost = urlImg;
                    });
                })
              );
          }
        }
      });
  }
}

import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
// const mongoUrl = 'http://localhost:9000/portafolio/version1/';
const mongoUrl = 'https://portafolioback.herokuapp.com/portafolio/version1/';

const myMail = 'https://mailthis.to/cubancoder@gmail.com';
let headersReq = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Origin': '*',
});

@Injectable({
  providedIn: 'root',
})
export class PostServicesService {
  public change: EventEmitter<any> = new EventEmitter();
  public changeWord: EventEmitter<string> = new EventEmitter();
  public imagesCarousel: EventEmitter<any> = new EventEmitter();
  public wordChanging: BehaviorSubject<string>;

  constructor(private http: HttpClient) {}

  sendContactFormToMyMail(form: any) {
    return this.http.post(myMail, form, { responseType: 'text' }).pipe(
      map((response) => {
        if (response) {
          //console.log(response);
          return response;
        } else {
          (error: any) => {
            return error;
          };
        }
      })
    );
  }
  getAllPosts() {
    return this.http.get<any>(`${mongoUrl}post/all`, { headers: headersReq });
  }

  searchAPost(words: string) {
    return this.http.get<string>(`${mongoUrl}post/${words}/search`);
  }

  deleteAPost(idPost: any) {
    return this.http.delete<any>(`${mongoUrl}post/delete/${idPost}/post`);
  }

  getAPost(idPost: string) {
    return this.http.get<string>(`${mongoUrl}post/get/${idPost}/selected`);
  }

  createNewPost(postCreated) {
    return this.http.post(`${mongoUrl}post/create`, postCreated);
  }

  commentOnPost(idPost, comment: string) {
    return this.http.post(`${mongoUrl}post/${idPost}/add/comment`, comment);
  }

  dataTransferredComponents(value) {
    this.change.emit(value);
  }

  wordDataTrasferrComponents(word: string) {
    this.changeWord.emit(word);
  }

  async imagesFromParent(images: string[], id: string) {
    let object = await new Object();
    object = await { images, id };
    //console.log(object);

    await this.imagesCarousel.emit(object);
  }
}

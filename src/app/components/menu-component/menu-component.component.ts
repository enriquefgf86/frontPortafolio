import { AuthServicesService } from './../../services/auth-services.service';
import { PostServicesService } from './../../services/post-services.service';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu-component',
  templateUrl: './menu-component.component.html',
  styleUrls: ['./menu-component.component.css'],
})
export class MenuComponentComponent implements OnInit {
  searchParam: string;
  showPortafolio: boolean;
  newPost: boolean;
  pdfUpload: boolean;
  contactMe: boolean;
  myCv: boolean;
  boutMe: boolean;
  showEditables: boolean;
  boutSite: boolean;
  userIsAuth: boolean;
  forLogOut: boolean;

  @ViewChild('searchWord', { static: true }) child: ElementRef;
  constructor(
    private postService: PostServicesService,
    private router: Router,
    private location: Location,
    private authService: AuthServicesService
  ) {}

  ngOnInit(): void {
    console.log(this.searchParam);
    console.log(this.child);
    console.log(this.router.url);
    // this.authService.isUserLoggedIn();
    // this.userIsAuth = this.authService.isUserLoggedIn().valueOf();
    console.log(this.userIsAuth);
    this.authService.authDetection.subscribe(async (result) => {
      console.log(result);
      this.userIsAuth = await result;
      this.newPost = await result;
      this.pdfUpload = await result;
      console.log(this.userIsAuth);
    });
    console.log(this.userIsAuth);

    if (!this.userIsAuth) {
      // this.newPost = false;
      // this.pdfUpload = false;
      if (this.router.url == '/post') {
        this.newPost = false;
      } else {
        this.newPost = false;
      }
      if (this.location.path() == '/post') {
        this.newPost = false;
      } else {
        this.newPost = false;
      }
    }
    if (this.userIsAuth) {
      // this.newPost = true;
      // this.pdfUpload = true;
      if (this.router.url == '/post') {
        this.newPost = false;
      } else {
        this.newPost = true;
      }

      if (this.location.path() == '/post') {
        this.newPost = false;
      } else {
        this.newPost = true;
      }
    }

    if (this.router.url == '') {
      this.showPortafolio = false;
    } else {
      this.showPortafolio = true;
    }
    if (this.router.url == '/pdf-viewer') {
      this.myCv = false;
    } else {
      this.myCv = true;
    }
    if (this.router.url == '/boutme') {
      this.boutMe = false;
    } else {
      this.boutMe = true;
    }
    if (this.router.url == '/boutsite') {
      this.boutSite = false;
    } else {
      this.boutSite = true;
    }
    if (this.router.url == '/contact-form') {
      this.contactMe = false;
    } else {
      this.contactMe = true;
    }

    this.router.events.subscribe(async (val) => {
      await this.location.path();

      if (this.location.path() == '') {
        this.showPortafolio = false;
      } else {
        this.showPortafolio = true;
      }
      if (this.location.path() == '/pdf-viewer') {
        this.myCv = false;
      } else {
        this.myCv = true;
      }
      if (this.location.path() == '/boutme') {
        this.boutMe = false;
      } else {
        this.boutMe = true;
      }
      if (this.location.path() == '/boutsite') {
        this.boutSite = false;
      } else {
        this.boutSite = true;
      }
      if (this.location.path() == '/contact-form') {
        this.contactMe = false;
      } else {
        this.contactMe = true;
      }
    });
  }

  async logOut() {
    await this.authService.logOut();
    this.authService.emittingAuthState((this.forLogOut = false));
    this.authService.authDetection.subscribe((result) => {
      console.log(result);
      this.userIsAuth = result;
      console.log(this.userIsAuth);
    });
    this.routerMethod();
  }

  async routerMethod() {
    await this.router.navigate(['/']);
  }

  async search(search: string) {
    console.log(search);
    this.searchParam = await search;

    if (this.router.url != '') {
      //redireccionando a la paginan en donde se tienen todos los cards
      await this.router.navigate(['']);
      setTimeout(() => {
        //estableciendo el tiempompara la ejecucion del servicio
        this.postService.wordDataTrasferrComponents(this.searchParam);
      }, 500);
    } else await this.postService.wordDataTrasferrComponents(this.searchParam); //de estar en el url
    //simple,ente se llama al servicio
  }

  async clearAllSearch() {
    this.child.nativeElement.value = '';
    this.searchParam = '';

    await this.postService.wordDataTrasferrComponents(this.searchParam);
    // console.log(this.searchParam, this.child);
  }
}

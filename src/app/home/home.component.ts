import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isShow: boolean;

  constructor(private routes: Router) {}

  ngOnInit(): void {

    //console.log(this.isShow);
  }
  goToPdf() {
    this.routes.navigate(['/pdf-viewer']);
  }

  goToMe() {
    this.routes.navigate(['/boutme']);
  }
  goToSite() {
    this.routes.navigate(['/boutsite']);
  }
  goToProjects() {
    this.routes.navigate(['']);
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  goToContact(){
    this.routes.navigate(['/contact-form']);
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css'],
})
export class PdfViewerComponent implements OnInit {
  pdf: any;
  loader:boolean;


  constructor(
    private storage: AngularFireStorage,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {

    this.loader=true;

    this.storage
      .ref('pdf')
      .child('pdf')
      .getDownloadURL()
      .subscribe((result) => {
        // console.log(result);
        if(result){
          this.loader=false;
        }

        this.pdf = this.sanitizer.bypassSecurityTrustResourceUrl(result);
      });
  }
}

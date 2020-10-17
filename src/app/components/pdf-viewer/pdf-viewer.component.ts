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

  constructor(
    private storage: AngularFireStorage,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.storage
      .ref('pdf')
      .child('pdf')
      .getDownloadURL()
      .subscribe((result) => {
        console.log(result);

        this.pdf = this.sanitizer.bypassSecurityTrustResourceUrl(result);
      });
  }
}

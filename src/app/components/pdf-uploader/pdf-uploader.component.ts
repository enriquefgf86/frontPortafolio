import { AngularFireStorage } from '@angular/fire/storage';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { pdfModel } from './../../models/pdfModel';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-pdf-uploader',
  templateUrl: './pdf-uploader.component.html',
  styleUrls: ['./pdf-uploader.component.css'],
})
export class PdfUploaderComponent implements OnInit {
  pdfUpLoader: FormGroup;
  arrayPdf:any[]=[];
  pdfToCreate=new pdfModel();

  constructor(
    private firestorage: AngularFireStorage,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initPdfForm();
  }

  initPdfForm() {
    this.pdfUpLoader = this.formBuilder.group({
     
      pdf: new FormControl('', Validators.compose([Validators.required])),
      
    });
  }

  setPDF() {
    this.pdfToCreate.pdf= this.pdfUpLoader.get('pdf').value;
    
  }

  pdfSelect(event) {
    if (event.target.files && event.target.files[0]) {
      let filesPDFAmmount = event.target.files.length;
      for (let i = 0; i < filesPDFAmmount; i++) {
        const pdfReader = new FileReader();
        pdfReader.onload = async (pdfCharger: any) => {
          console.log(pdfCharger.target.result);
          this.arrayPdf.push(pdfCharger.target.result); //Para Guardar en Firebase
          
          this.pdfUpLoader.patchValue({ videosPost: this.arrayPdf }); //Slavando part del string en mongo
        };
        pdfReader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  uploadPDF() {
    this.setPDF();
    const storagePdfPath = ('/pdf/');

    for (let i = 0; i < this.arrayPdf.length; i++) {
            this.firestorage
              .ref(storagePdfPath)
              .child(
                'pdf'
              )
              .putString(this.arrayPdf[i].split(',')[1], 'base64', {
                contentType: 'application/pdf',
              })
              .snapshotChanges()
              .pipe(
                finalize(() => {
                  this.firestorage
                    .ref(storagePdfPath)
                    .child(
                      'pdf'
                    )
                    .getDownloadURL()
                    .subscribe((urlPdf) => {
                      console.log(urlPdf);
                      this.pdfUpLoader.value.videosPost = urlPdf;
                    });
                })
              );

          }
  }
}

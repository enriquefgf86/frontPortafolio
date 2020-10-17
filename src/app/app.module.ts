import { ComponentsModule } from '../../src/app/components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import { AppRoutingModule, PAGES_ROUTES_ROOT } from './app-routing.module';
//Angular Material
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';

import { AppComponent } from './app.component';
import { MenuComponentComponent } from './components/menu-component/menu-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostComponent } from './components/post/post.component';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostViewComponent } from './components/post-view/post-view.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment.prod';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxCarouselModule } from 'ngx-light-carousel/lib/ngx-light-carousel.module';
import { PdfUploaderComponent } from './components/pdf-uploader/pdf-uploader.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { HomeComponent } from './home/home.component';
import { PAGES_ROUTES_ROOT } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // MenuComponentComponent,
    // PostComponent,
    // AllPostsComponent,
    // PostViewComponent,
    // AddCommentComponent,
    // PdfUploaderComponent,
    // PdfViewerComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    //AppRoutingModule,
    MatMenuModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatListModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(
      environment.firebaseConfig,
      'frontPortafolio'
    ),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    MatCarouselModule.forRoot(),
    MatExpansionModule,
    NgbModule,
    ComponentsModule,
    // NgxCarouselModule,
    PAGES_ROUTES_ROOT,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

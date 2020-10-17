import { AboutWebsiteComponent } from './about-website/about-website.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { SignupComponentComponent } from './signup-component/signup-component.component';
import { PdfUploaderComponent } from './pdf-uploader/pdf-uploader.component';
import { ContactMeComponent } from './contact-me/contact-me.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { ComponentsComponent } from './components.component';
import { PostViewComponent } from '../components/post-view/post-view.component';
import { AllPostsComponent } from '../components/all-posts/all-posts.component';
import { PostComponent } from '../components/post/post.component';
import { MenuComponentComponent } from '../components/menu-component/menu-component.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpModel } from '../models/signup-model';

const components_routes: Routes = [
  {
    path: '',
    component: ComponentsComponent,
    children: [
      { path: 'post', component: PostComponent },
      {
        path: 'post/view/:idPostView',
        component: PostViewComponent,
        children: [],
      },
      {
        path: 'signup',
        component: SignupComponentComponent,
      },
      {
        path: 'boutme',
        component: AboutMeComponent,
      },
      {
        path: 'boutsite',
        component: AboutWebsiteComponent,
      },

      {
        path: 'login',
        component: LoginComponentComponent,
      },
      {
        path: 'pdf',
        component: PdfUploaderComponent,
      },
      {
        path: '',
        component: AllPostsComponent,
        children: [],
      },
      {
        path: 'contact-form',
        component: ContactMeComponent,
      },

      {
        path: 'pdf-viewer',
        component: PdfViewerComponent,
      },
      { path: '', redirectTo: '/', pathMatch: 'full' },
    ],
  },
];

export const COMPONENTS_ROUTES = RouterModule.forChild(components_routes);

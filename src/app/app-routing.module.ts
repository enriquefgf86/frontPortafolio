import { HomeComponent } from './home/home.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { PostComponent } from './components/post/post.component';
import { MenuComponentComponent } from './components/menu-component/menu-component.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  // { path: 'post/view/:idPostView', component: PostViewComponent },
  // {
  //   path: '',
  //   component: AllPostsComponent,
  // },
  // { path: '', redirectTo: '/', pathMatch: 'full' },
];

export const PAGES_ROUTES_ROOT=RouterModule.forRoot(routes, { useHash: true });


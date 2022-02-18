import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { UsersPageComponent } from './components/users-page/users-page.component';

const routes: Routes = [
  {path: '', component: AuthPageComponent},
  {path: 'users', component: UsersPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

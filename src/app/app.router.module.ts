import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import {Routes, RouterModule, CanActivateChild} from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate';
import { ErrorComponentComponent } from './error-component/error-component.component';
import { ServerResolver } from './servers/server/server-resolver.service';

const appRoute: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent, children: [
    {path: ':id/:name', component: UserComponent }]},
  {path: 'servers', canActivateChild: [AuthGuard], component: ServersComponent, children: [
    {path: ':id', component: ServerComponent, resolve: {server: ServerResolver}},
    {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]}]},
    {path: 'not-found', component: ErrorComponentComponent, data: {message: 'Page not found'} },
    {path: '**', component: PageNotFoundComponent}
];

@NgModule ({
  imports: [
    //RouterModule.forRoot(appRoute, {useHash: true})
    RouterModule.forRoot(appRoute)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}

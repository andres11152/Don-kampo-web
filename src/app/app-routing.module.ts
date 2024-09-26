import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from "./user/user.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./service/auth.guard";
import {DetailComponent} from "./detail/detail.component";
import {UserApprovedComponent} from "./user.approved/user.approved.component";
import {UserRefusedComponent} from "./user.refused/user.refused.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {InformComponent} from "./inform/inform.component";
import {InformDetailComponent} from "./inform.detail/inform.detail.component";
import {ReportsSentComponent} from "./reports.sent/reports.sent.component";

const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'users', component: UserComponent, canActivate: [AuthGuard]},
    {path: 'detail/:id', component: DetailComponent},
    {path: 'approved', component: UserApprovedComponent},
    {path: 'refused', component: UserRefusedComponent},
    {path: 'informs', component: InformComponent},
    {path: 'reports_sent', component: ReportsSentComponent},
    {path: 'inform_detail/:id', component: InformDetailComponent},
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

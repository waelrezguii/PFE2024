

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BanquesComponent } from './banques/banques.component';
import { AccueilComponent } from './accueil/accueil.component';
import { CoursComponent } from './cours/cours.component';
import { AdministrationComponent } from './administration/administration.component';
import { ForumComponent } from './forum/forum.component';
import { PortailClientComponent } from './portail-client/portail-client.component';
import { PortailBanquiersComponent } from './portail-banquiers/portail-banquiers.component';
import { RegisterComponent } from './register/register.component';
import { PortailCLoggedComponent } from './portail-clogged/portail-clogged.component';
import { GestionCompteComponent } from './gestion-compte/gestion-compte.component';
import { GestionAnnoncesComponent } from './gestion-annonces/gestion-annonces.component';
import { ConvertisseurComponent } from './convertisseur/convertisseur.component';
import { DeviseComponent } from './devise/devise.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { CorpsGestionannoncesComponent } from './corps-gestionannonces/corps-gestionannonces.component';
import { HistoriquesComponent } from './historiques/historiques.component';
import { PortailBloggedComponent } from './portail-blogged/portail-blogged.component';
import { ForumEveryoneComponent } from './forum-everyone/forum-everyone.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { BanquiersComponent } from './banquiers/banquiers.component';
import { ListeclientsComponent } from './listeclients/listeclients.component';
import { clientAuthGuard } from './client-auth.guard';
import { banquierAuthGuard } from './banquier-auth.guard';
import { authAdminGuard } from './auth-admin.guard';
import { authBqGuard } from './auth-bq.guard';
import { authclientGuard } from './authclient.guard';
import { authadminsGuard } from './authadmin.guard';
const routes: Routes = [
  {path:'',component:AccueilComponent},
  { path: 'banques', component: BanquesComponent },
{path:'cours',component:CoursComponent},
{path:'administration',component:AdministrationComponent,canActivate: [authadminsGuard]},
{path:'forum',component:ForumComponent},
{ path: 'portailC', component: PortailClientComponent,canActivate: [authclientGuard]},
{path:'portailB',component:PortailBanquiersComponent, canActivate: [authBqGuard]},
{path:'registerC',component:RegisterComponent},
{ path: 'portailCL', component: PortailCLoggedComponent, canActivate: [clientAuthGuard] },
{path:'gestionCompte',component:GestionCompteComponent},
{path:'gestionAnnonces',component:GestionAnnoncesComponent, canActivate: [clientAuthGuard]},
{path:'convert',component:ConvertisseurComponent},
{path:'devise',component:DeviseComponent},
{ path:'verify-email/:token', component: VerifyEmailComponent },
{path:'corps',component:CorpsGestionannoncesComponent, canActivate: [clientAuthGuard]},
{path:'historiques',component:HistoriquesComponent, canActivate: [clientAuthGuard]},
{path:'portailBlogged',component:PortailBloggedComponent, canActivate: [banquierAuthGuard] },
{path:'ForumE',component:ForumEveryoneComponent, canActivate: [clientAuthGuard]},
{path:'post/:id',component:PostDetailsComponent},
{path:'forget',component:ForgotPasswordComponent},
{path:'resetpassword/:token',component:ResetPasswordComponent},
{path:'banquiers',component:BanquiersComponent,canActivate: [authAdminGuard]},
{path:'clients',component:ListeclientsComponent,canActivate: [authAdminGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



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
const routes: Routes = [
  {path:'',component:AccueilComponent},
  { path: 'banques', component: BanquesComponent },
{path:'cours',component:CoursComponent},
{path:'administration',component:AdministrationComponent},
{path:'forum',component:ForumComponent},
{path:'portailC',component:PortailClientComponent},
{path:'portailB',component:PortailBanquiersComponent},
{path:'registerC',component:RegisterComponent},
{path:'portailCL',component:PortailCLoggedComponent},
{path:'gestionCompte',component:GestionCompteComponent},
{path:'gestionAnnonces',component:GestionAnnoncesComponent},
{path:'convert',component:ConvertisseurComponent},
{path:'devise',component:DeviseComponent},
{ path:'verify-email/:token', component: VerifyEmailComponent },
{path:'corps',component:CorpsGestionannoncesComponent},
{path:'historiques',component:HistoriquesComponent},
{path:'portailBlogged',component:PortailBloggedComponent},
{path:'ForumE',component:ForumEveryoneComponent},
{path:'post/:id',component:PostDetailsComponent},
{path:'forget',component:ForgotPasswordComponent},
{path:'resetpassword/:token',component:ResetPasswordComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

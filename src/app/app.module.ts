import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { NgChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';

// Import your application components
import { AppComponent } from './app.component';
import { BanquesComponent } from './banques/banques.component';
import { AccueilComponent } from './accueil/accueil.component';
import { CoursComponent } from './cours/cours.component';
import { AdministrationComponent } from './administration/administration.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BanqueFormDialogComponent } from './banque-form-dialog/banque-form-dialog.component';
import { ExchangeChartComponent } from './exchange-chart/exchange-chart.component';
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
import { VerifComponent } from './verif/verif.component';
import { CorpsGestionannoncesComponent } from './corps-gestionannonces/corps-gestionannonces.component';
import { HistoriquesComponent } from './historiques/historiques.component';
import { PortailBloggedComponent } from './portail-blogged/portail-blogged.component';
import { ForumEveryoneComponent } from './forum-everyone/forum-everyone.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostFormDialogComponent } from './post-form-dialog/post-form-dialog.component';
import { BanqueajoutFormDialogComponent } from './banqueajout-form-dialog/banqueajout-form-dialog.component';
import { BanqueSupprimerFormDialogComponent } from './banque-supprimer-form-dialog/banque-supprimer-form-dialog.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AjoutdevComponent } from './ajoutdev/ajoutdev.component';

@NgModule({
  declarations: [
    AppComponent,
    BanquesComponent,
    AccueilComponent,
    CoursComponent,
    AdministrationComponent,
    NavbarComponent,
    BanqueFormDialogComponent,
    ExchangeChartComponent,
    ForumComponent,
    PortailClientComponent,
    PortailBanquiersComponent,
    RegisterComponent,
    PortailCLoggedComponent,
    GestionCompteComponent,
    GestionAnnoncesComponent,
    ConvertisseurComponent,
    DeviseComponent,
    VerifyEmailComponent,
    VerifComponent,
    CorpsGestionannoncesComponent,
    HistoriquesComponent,
    PortailBloggedComponent,
    ForumEveryoneComponent,
    PostDetailsComponent,
    PostFormDialogComponent,
    BanqueajoutFormDialogComponent,
    BanqueSupprimerFormDialogComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AjoutdevComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    NgChartsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

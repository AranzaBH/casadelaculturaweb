import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';

import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card'; // Importamos el módulo de MatCard

import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import { FormsModule} from '@angular/forms';
import {MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar';
import { HomeComponent } from './pages/home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { authInterceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list'; // Importar MatListModule
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { AuthService } from './services/auth/auth.service';  // Asegúrate de que la ruta sea correcta
import { CrearTallerComponent } from './talleres/crear-taller/crear-taller.component';
import { TallerComponent } from './talleres/taller/taller.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TallerDetailsComponent } from './talleres/taller-details/taller-details.component';

import { InscripcionService } from './services/inscripcion.service';
import { TalleresUserComponent } from './pages/user/talleres-user/talleres-user.component';
import { ReactivoComponent } from './talleres/actividades/reactivo/reactivo.component';
import { CuestionarioComponent } from './talleres/actividades/cuestionario/cuestionario.component';

import { ActualizacionComponent } from './pages/profile/actualizacion/actualizacion.component';
import { CuestionarioUserComponent } from './pages/user/actividades/actividad/cuestionario-user/cuestionario-user.component';
import { CrearActividadComponent } from './talleres/actividades/crear-actividad/crear-actividad.component';
import { VideoComponent } from './talleres/actividades/video/video.component';
import { AssetsManagerComponent } from './components/assets-manager/assets-manager.component';
import { ImagenesComponent } from './components/imagenes/imagenes.component';

import { ActividadesTallerComponent } from './talleres/actividades/actividades-taller/actividades-taller.component';
import { ActividadesDetallesComponent } from './talleres/actividades/actividades-detalles/actividades-detalles.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { TipoTallerComponent } from './talleres/tipo-taller/tipo-taller.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { TipoTallerFormComponent } from './talleres/tipo-taller/tipo-taller-form.component';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    SidebarComponent,
    ProfileComponent,
    WelcomeComponent,
    CrearTallerComponent,
    TallerComponent,
    TallerDetailsComponent,
    TalleresUserComponent,
    ReactivoComponent,
    CuestionarioComponent,
    VideoComponent,
    ActualizacionComponent,
    CuestionarioUserComponent,
    CrearActividadComponent,
    AssetsManagerComponent,
    ImagenesComponent,
    ActividadesTallerComponent,
    ActividadesDetallesComponent,
    SafeUrlPipe,
    TipoTallerComponent,
    TipoTallerFormComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    ToastModule


  ],
  providers: [authInterceptorProviders, AuthService, InscripcionService,MessageService],
  bootstrap: [AppComponent],

})
export class AppModule { }

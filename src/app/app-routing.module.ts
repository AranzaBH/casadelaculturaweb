import { NormalGuard } from './services/normal.guard';
import { AdminGuard } from './services/admin.guard';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { CrearTallerComponent } from './talleres/crear-taller/crear-taller.component';
import { TallerComponent } from './talleres/taller/taller.component';
import { TallerDetailsComponent } from './talleres/taller-details/taller-details.component'; // Asegúrate de que tienes este componente
import { TalleresUserComponent } from './../app/pages/user/talleres-user/talleres-user.component';
import { ReactivoComponent } from './talleres/actividades/reactivo/reactivo.component';

import { CuestionarioComponent } from './talleres/actividades/cuestionario/cuestionario.component';
import { CuestionarioUserComponent } from './pages/user/actividades/actividad/cuestionario-user/cuestionario-user.component';
import { VideoComponent } from './talleres/actividades/video/video.component';
import { CrearActividadComponent } from './talleres/actividades/crear-actividad/crear-actividad.component';
import { ActividadesTallerComponent } from './talleres/actividades/actividades-taller/actividades-taller.component';
import { ImagenesComponent } from './components/imagenes/imagenes.component';
import { ActividadesDetallesComponent } from './talleres/actividades/actividades-detalles/actividades-detalles.component';

const routes: Routes = [
  
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin/dash',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    pathMatch: 'full',
    canActivate: [NormalGuard]
    
  },
  {
    path: 'admin/profile',
    component: ProfileComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [NormalGuard]
  },
    
  {
    path: 'admin/crearT', // Nueva ruta para el componente de talleres
    component: CrearTallerComponent,
    canActivate: [AdminGuard] // Usando NormalGuard para usuarios normales
  
  },
  {
    path: 'admin/crearT', // Nueva ruta para el componente de tipo de talleres
    component: TallerComponent,
    canActivate: [AdminGuard] // Usando NormalGuard para usuarios normales
  
  },
  {
    path: 'admin/crearT/taller', // Nueva ruta para el componente de talleres
    component: TallerComponent,
    canActivate: [AdminGuard] // Usando NormalGuard para usuarios normales
  
  },
  //talleres
  { path: '', component: UserDashboardComponent },
  
  { path: 'taller/:id', component: TallerDetailsComponent },

  
  {
    path: 'inscripcion',
    component: TalleresUserComponent,
    canActivate: [NormalGuard]
  },
  {
  path: 'admin/reactivo',
    component: ReactivoComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/cuestionario',
      component: CuestionarioComponent,
      canActivate: [AdminGuard]
    },
    {
      path: 'admin/cuestionario-user',
        component: CuestionarioUserComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'admin/videos',
          component: VideoComponent,
          canActivate: [AdminGuard]
        },
        {
          path: 'admin/actividad',
            component: CrearActividadComponent,
            canActivate: [AdminGuard]
          },
          {
          
          path: 'admin/imagenes',
            component: ImagenesComponent,
            canActivate: [AdminGuard]
          },
          {
          
            path: 'admin/actividad_taller',
              component: ActividadesTallerComponent,
              canActivate: [AdminGuard]
            },


            { path: '', component: ActividadesDetallesComponent },  // Componente para la lista de actividades
  { path: 'admin/actividades_detalles/:id', component: ActividadesDetallesComponent },
    
    
  ];
  
  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

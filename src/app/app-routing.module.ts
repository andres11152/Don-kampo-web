import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Servicios y Guards
import { AuthGuard } from './service/auth.guard';
import { ApiService } from './service/api.service';

// Componentes Generales
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductsComponent } from './components/products/products.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { CartComponent } from './components/cart/cart.component';

// Definición de rutas
const routes: Routes = [
  { path: '', component: HomeComponent },                        // Página de inicio
  { path: 'about', component: AboutComponent },                  // Página "Acerca de"
  { path: 'services', component: ServiciosComponent },           // Página de servicios
  { path: 'products', component: ProductsComponent },            // Página de productos
  { path: 'contact', component: ContactComponent },              // Página de contacto
  { path: 'cart', component: CartComponent },                    // Página de carrito
  { path: 'login', component: LoginComponent },                  // Página de login
  { path: 'register', component: RegisterComponent},             // Página de registro
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },    // Perfil con guardia de autenticación
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },        // Página de administración con AuthGuard
  { path: '**', redirectTo: '', pathMatch: 'full' }              // Redirección a la página de inicio para rutas no encontradas
];

// Módulo de enrutamiento
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, { useHash: true }) // Utilizando hash en las rutas para evitar problemas de recarga en servidores
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

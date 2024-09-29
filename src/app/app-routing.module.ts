import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Servicios y Guards
import { AuthGuard } from './service/auth.guard';

// Componentes generales
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegistroComponent } from './components/registro/registro.component';

// Componentes del módulo de perfil
import { ProfileComponent } from './profile.module/profile-component/profile.component';

// Componentes del módulo de login
import { LoginComponent } from './login-module/login-component/login.component';

// Componentes del módulo de administración
import { AdminComponent } from './admin-module/admin-component/admin.component';

// Componentes del módulo del carrito
import { CartComponent } from './cart-module/cart-component/cart.component';

// Definición de rutas
const routes: Routes = [
  { path: '', component: HomeComponent },                        // Página de inicio
  { path: 'about', component: AboutComponent },                  // Página "Acerca de"
  { path: 'services', component: ServiciosComponent },           // Página de servicios
  { path: 'products', component: ProductosComponent },           // Página de productos
  { path: 'contact', component: ContactComponent },             // Página de contacto
  { path: 'cart', component: CartComponent },                    // Página de carrito
  { path: 'login', component: LoginComponent },                  // Página de login
  { path: 'register', component: RegistroComponent },            // Página de registro
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },  // Perfil con guardia de autenticación
  { path: 'admin', component: AdminComponent },                  // Página de administración
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

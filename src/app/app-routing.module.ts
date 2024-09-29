import { AboutComponent } from './components/about/about.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Componentes importados
import { LoginComponent } from './login-module/login-component/login.component';
import { AuthGuard } from './service/auth.guard';
import { AdminComponent } from './admin-module/admin-component/admin.component';
import { HomeComponent } from './components/home/inicio.component';
import { AboutComponent } from './about/about.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { CarritoComponent } from './cart-module/cart/carrito.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CartModule } from './cart-module/cart.module';


// Definición de rutas
const routes: Routes = [
    { path: '', component: HomeComponent }, // Página de inicio
    { path: 'about', component: AboutComponent },
    { path: 'services', component: ServiciosComponent },
    { path: 'products', component: ProductosComponent },
    { path: 'contact', component: ContactoComponent },
    { path: 'cart', component: CartModule },
    { path: 'detalle-producto/:id', component: DetalleProductoComponent }, // Dinámico por producto
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'perfil', component: PerfilComponent , canActivate: [AuthGuard] },
    { path: 'admin', component: AdminComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' } // Redirección a la página de inicio si no encuentra la ruta
  ];

// Módulo de rutas
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(routes, { useHash: true }) // Utilizando hash en las rutas para evitar problemas de recarga en servidores
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }

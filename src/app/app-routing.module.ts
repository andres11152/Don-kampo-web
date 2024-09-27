import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Componentes importados
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './service/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { RegistroComponent } from './components/registro/registro.component';
import { PerfilComponent } from './components/perfil/perfil.component';


// Definición de rutas
const routes: Routes = [
    { path: '', component: InicioComponent }, // Página de inicio
    { path: 'sobre-nosotros', component: SobreNosotrosComponent },
    { path: 'servicios', component: ServiciosComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'detalle-producto/:id', component: DetalleProductoComponent }, // Dinámico por producto
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'perfil', component: PerfilComponent },
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

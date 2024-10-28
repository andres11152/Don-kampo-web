import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';  // Servicio de autenticación de Angular
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']  // Corregido a styleUrls (en plural)
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,  // Servicio para manejar el registro
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')  // Validador personalizado para contraseñas coincidentes
    });
  }

  // Función para facilitar el acceso a los controles del formulario en la plantilla
  get f() { return this.registerForm.controls; }

  // Envío del formulario
  onSubmit(): void {
    this.submitted = true;

    // Si el formulario es inválido, se detiene el proceso
    if (this.registerForm.invalid) {
      return;
    }

    // Si es válido, realiza el registro a través del servicio
    this.authService.register(this.registerForm.value).subscribe({
      next: (response: any) => {  // Tipificación del response
        console.log('Registro exitoso');
        this.router.navigate(['/login']);  // Redirige al login después del registro
      },
      error: (error: any) => {  // Tipificación del error
        console.error('Error durante el registro', error);
        this.errorMessage = error.error?.message || 'Error en el registro';  // Captura el mensaje de error
      }
    });
  }

  // Validador personalizado para comprobar si las contraseñas coinciden
  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']) {
        return;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mustMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }
}

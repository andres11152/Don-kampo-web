import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]], // Campo agregado para apellido
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      userType: ['', Validators.required]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  // Función para facilitar el acceso a los controles del formulario en la plantilla
  get f() { return this.registerForm.controls; }

  // Envío del formulario
  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: (response: any) => {
        console.log('Registro exitoso:', response);
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.error('Error durante el registro', error);

        // Manejo detallado de errores de conexión
        if (error.status === 0) {
          this.errorMessage = 'No se pudo conectar con el servidor. Verifique su conexión.';
        } else {
          this.errorMessage = error.error?.message || 'Error en el registro. Inténtelo nuevamente.';
        }
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

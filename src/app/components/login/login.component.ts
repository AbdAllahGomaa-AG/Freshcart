import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationApiService } from '../../Core/services/Authentication/authentication-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // inject services
  private readonly _AuthenticationApiService = inject(AuthenticationApiService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  //
  massageError: string = '';
  nameLogin: string = '';
  //
  isLading: boolean = false;

  //new
  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  loginFormData(): void {
    if (this.loginForm.valid) {
      this.isLading = true;
      this._AuthenticationApiService.loginForm(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            // set token
            localStorage.setItem('token', res.token);

            // decode
            this._AuthenticationApiService.saveTokenPass;
            this.alertSuccessLogin();
            // navigate
            setTimeout(() => {
              this._Router.navigate(['/home'] );
            }, 1000);
          }
          this.isLading = false;
          // navigation  to login and add alert success
          console.log(res.user.name);
          this.nameLogin = res.user.name;
        },
        error: (err: HttpErrorResponse) => {
          this.massageError = err.error.message;
          this.alertPleaseLogin();
          this.isLading = false;

          console.log(err);
        },
      });
    } else {
      this.massageError = 'Please fill in all fields';
      this.loginForm.setErrors({ miss: true });
      this.loginForm.markAllAsTouched();
    }
  }

  // alertPleaseFall
  alertPleaseLogin(): void {
    Swal.fire({
      title: 'Error!',
      text: this.massageError,
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }

  // alertSuccess
  alertSuccessLogin(): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: 'success',
      title: 'login successful',
    });
  }
}

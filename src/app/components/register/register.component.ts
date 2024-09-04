import { Component, inject, OnDestroy } from '@angular/core';
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
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy {
  // inject services
  private readonly _AuthenticationApiService = inject(AuthenticationApiService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  registersUN!: Subscription;

  //
  massageError: string = '';
  //
  isLading: boolean = false;

  //new
  register: FormGroup = this._FormBuilder.group(
    {
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
      rePassword: [null],
      phone: [
        null,
        [Validators.required, Validators.pattern(/^01[0-5]\d{8}$/)],
      ],
    },
    { validators: this.confirmPassword }
  );

  //old
  // register: FormGroup = new FormGroup(
  //   {
  //     name: new FormControl(null, [
  //       Validators.required,
  //       Validators.minLength(3),
  //       Validators.maxLength(20),
  //     ]),
  //     email: new FormControl(null, [Validators.required, Validators.email]),
  //     password: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^\w{6,}$/),
  //     ]),

  //     rePassword: new FormControl(null),
  //     phone: new FormControl(null, [
  //       Validators.required,
  //       Validators.pattern(/^01[0-5]\d{8}$/),
  //     ]),
  //   },
  //   this.confirmPassword
  // );

  registerData(): void {
    if (this.register.valid) {
      this.isLading = true;
      this._AuthenticationApiService
        .setRegisterForm(this.register.value)
        .subscribe({
          next: (res) => {
            this.alertSuccess();
            if (res.message === 'success') {
              this.alertSuccess();
              setTimeout(() => {
                this._Router.navigate(['/login']);
              }, 2000);
            }
            this.isLading = false;
            // navigation  to login and add alert success
            console.log(res);
          },
          error: (err: HttpErrorResponse) => {
            this.massageError = err.error.message;
            this.alertPleaseFall();
            console.log(err.message);
            this.isLading = false;
          },
        });
    } else {
      this.massageError = 'Please fill in all fields';
      this.register.setErrors({ miss: true });
      this.register.markAllAsTouched();
    }
  }

  //confirmPassword
  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      console.log('miss');
      return { miss: true };
    }
  }

  ngOnDestroy(): void {
    this.registersUN?.unsubscribe();
  }
  // alertPleaseFall
  alertPleaseFall(): void {
    Swal.fire({
      title: 'Error!',
      text: this.massageError,
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }

  // alertSuccess
  alertSuccess(): void {
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
      title: 'Registration Successful',
    });
  }
}

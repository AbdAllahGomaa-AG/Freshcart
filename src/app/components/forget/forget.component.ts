import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationApiService } from '../../Core/services/Authentication/authentication-api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.scss',
})
export class ForgetComponent {
  //inject
  private readonly _AuthenticationApiService = inject(AuthenticationApiService);
  private readonly _Router = inject(Router);

  //
  steps: number = 1;
  isLading: boolean = false;
  //
  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[0-9]{6}$/),
    ]),
  });

  verifyRePassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
  });
  //
  SetEmailForget(): void {
    (this.isLading = true),
      this._AuthenticationApiService
        .SetEmail(this.verifyEmail.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.statusMsg === 'success') {
              (this.isLading = false), (this.steps = 2);
            }
          },
          error: (err) => {
            (this.isLading = false), console.log(err);
          },
        });
  }
  //
  SetCodeForgetForms(): void {
    (this.isLading = true),
      this._AuthenticationApiService.SetCode(this.verifyCode.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === 'Success') {
            (this.isLading = false), (this.steps = 3);
          }
        },
        error: (err) => {
          (this.isLading = false), console.log(err);
        },
      });
  }
  //
  SetPassForgetForms(): void {
    (this.isLading = true),
      this._AuthenticationApiService
        .SetRestPassword(this.verifyRePassword.value)
        .subscribe({
          next: (res) => {
            (this.isLading = false),
            this.alertSuccessLogin()
             localStorage.setItem('token', res.token);
            this._AuthenticationApiService.saveTokenPass();
            this._Router.navigate(['/home']);
          },
          error: (err) => {
            (this.isLading = false), console.log(err);
          },
        });
  }
//success
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
      title: 'restPassword successful',
    });
  }
}

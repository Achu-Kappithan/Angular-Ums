import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginuUser } from '../../states/action';
import { selectError, selectLoading, selectLoggedInUser } from '../../states/selector';
import Swal from 'sweetalert2';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  store = inject(Store)
  router = inject(Router)
  fb = inject(FormBuilder)
  loginForm!: FormGroup

  message$ = this.store.select(selectLoggedInUser)
  error$ = this.store.select(selectError)
  loading$ = this.store.select(selectLoading)

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });

    this.message$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        console.log("userloginstate", state);
        if (state) {
          Swal.fire({
            icon: 'success',
            title: state.message,
            timer: 2000,
            showConfirmButton: false
          });

          setTimeout(() => {
            this.router.navigate(['/profile']);
          }, 2000);
        }
      });

    this.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe((error) => {
        if (error) {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: error,
            confirmButtonColor: '#d33'
          });
        }
      });
  }

  OnSubmit() {
    const { email, password } = this.loginForm.value;
    if (this.loginForm.valid) {
      this.store.dispatch(loginuUser({ email, password }));
    } else {
      console.log("form not submitted");
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

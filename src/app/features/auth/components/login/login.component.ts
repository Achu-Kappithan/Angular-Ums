import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginuUser } from '../../states/action';
import { selectError, selectLoading, selectLoggedInUser, selectToken } from '../../states/selector';
import Swal from 'sweetalert2';
import { Subject, takeUntil } from 'rxjs';
import { UserserviceService } from '../../services/userservice.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  store = inject(Store)
  router = inject(Router)
  route = inject(ActivatedRoute)
  fb = inject(FormBuilder)
  loginForm!: FormGroup

  user$ = this.store.select(selectLoggedInUser)
  error$ = this.store.select(selectError)
  loading$ = this.store.select(selectLoading)
  jwt$ = this.store.select(selectToken)

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });

    this.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        console.log("userloginstate", state);
        if (state && state.success) {

          Swal.fire({
            icon: 'success',
            title: state.message,
            timer: 2000,
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
          });

          setTimeout(() => {
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile';
            this.router.navigate([returnUrl]);
          },1000);
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
            showConfirmButton: false,
            toast: true,
            position: 'top-end'
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

  service = inject(UserserviceService)

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { userRegistration } from '../../states/action';
import { selectUser, selectError, selectLoading } from '../../states/selector';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private destroy$ = new Subject<void>();

  signupform!: FormGroup;
  messag$ = this.store.select(selectUser);
  error$ = this.store.select(selectError);
  loading$ = this.store.select(selectLoading);

  ngOnInit() {
    this.signupform = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.messag$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        if (state) {
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful!',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.router.navigate(['/login']);
          });
        }
      });

    this.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe((error) => {
        console.log(error)
        if (error) {
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: error ,
            timer: 2000,
            showConfirmButton: false
          });
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    if (this.signupform.valid) {
      const { name, email, phoneNumber, password } = this.signupform.value;
      this.store.dispatch(userRegistration({ name, email, password, phoneNumber }));
    } else {
      this.signupform.markAllAsTouched();
    }
  }
}
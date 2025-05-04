import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { adminLogin, getallUsers } from '../../states/action';
import { selectError, selectToken } from '../../states/selector';
import Swal from 'sweetalert2'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {

  loginForm!: FormGroup;
  fb = inject(FormBuilder);
  store = inject(Store);
  route = inject(Router)

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });

    this.store.select(selectToken).subscribe(token => {
      if (token) {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome, Admin!',
          timer: 4000,
          showConfirmButton: false,
          toast: true,
          position: 'top-end'
        });
         this.route.navigate(['/admin/dashbord']);
      }
    });

    this.store.select(selectError).subscribe(error=>{
      if(error){
        Swal.fire({
          icon: 'error',
          title: error,
          text: 'Try again...!',
          timer: 4000,
          showConfirmButton: false,
          toast: true,
          position: 'top-end'
        });
      }
    })
  }

  OnSubmitForm() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(adminLogin({ email, password }));
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}

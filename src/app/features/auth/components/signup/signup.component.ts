import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectError, selectLoading, selectUserState } from '../../states/selector';
import { userRegistration } from '../../states/action';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  store =  inject(Store)
  router = inject(Router)
  signupform: FormGroup;

  messag$ = this.store.select(selectUserState)
  error$ = this.store.select(selectError)
  loading$ = this.store.select(selectLoading)

  constructor() {
    this.signupform = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(4)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phoneNumber: new FormControl("", [Validators.required, Validators.minLength(10)]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])
    });

    this.messag$.subscribe((state)=>{
      if(state.users){
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          timer: 2000,
          showConfirmButton: false
        });

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      }
    })

    this.error$.subscribe((error) => {
      if (error) {
        Swal.fire({
          icon: 'error',
          title: error,
          text: error,
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }

  OnSubmit() {
    const {name,email,phoneNumber,password} = this.signupform.value
    console.log("submissinon works")
    if (this.signupform.valid) {
      this.store.dispatch(userRegistration({name,email,password,phoneNumber}))
    }else{
      console.log('Form Not Valid');
      this.signupform.markAllAsTouched(); 
    }
  }
}

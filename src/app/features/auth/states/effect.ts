import { inject, Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects'
import { loginError, loginSucess, loginuUser, signupError, singupSucess, userRegistration } from "./action";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import {UserserviceService} from '../services/userservice.service'
import { response } from "express";
import { error } from "console";



@Injectable()
export class userEffect {
   private action$ = inject(Actions) 
   private userservice = inject(UserserviceService)

   userRegistration$ = createEffect(()=>
        this.action$.pipe(
            ofType(userRegistration),
            mergeMap((action)=>
                this.userservice.registerUser({
                    name:action.name,
                    email:action.email,
                    phoneNumber: action.phoneNumber,
                    password: action.password
                }).pipe(
                    tap((response) => console.log('Backend Response:', response)),
                    map((response)=>singupSucess({user:response})),
                    catchError((error)=>of(signupError({error:error.error.message || 'Signup Faild'})) )
                )
            )
        )
    )

    userLogin$ = createEffect(() =>
    this.action$.pipe(
      ofType(loginuUser),
      mergeMap((action) =>
        this.userservice.loginUser({
            email: action.email,
            password: action.password
        }).pipe(
          tap((response) => console.log('Backend login Response:', response)),
          map((response) => loginSucess({ 
              user: response, 
              jwtToken: response.jwtToken 
          })),
          catchError((error) => of(loginError({ error: error.error.message })))
        )
      )
    )
);
}
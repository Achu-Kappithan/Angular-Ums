import { inject, Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects'
import { signupError, singupSucess, userRegistration } from "./action";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import {UserserviceService} from '../services/userservice.service'



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
}
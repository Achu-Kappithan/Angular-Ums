import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType} from '@ngrx/effects'
import { adminLogin, adminLoginError, adminLoginSucess, fetchUserError, fetchUsersDetails, fetchUserSucess, getallUsers, getallUsersError, getAllUsersSuccess, loginError, loginSucess, loginuUser, logoutSucess, logoutUser, signupError, singupSucess, updateProfilePicture, updateProfilePictureFailure, updateProfilePictureSuccess, userRegistration } from "./action";
import { catchError, map, mergeMap, of, switchMap, tap } from "rxjs";
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

    userLogin$ = createEffect(() =>
        this.action$.pipe(
            ofType(loginuUser),
            mergeMap((action) =>
                this.userservice.loginUser({
                    email: action.email,
                    password: action.password
                }).pipe(
                tap((response) =>{
                  localStorage.setItem('jwtToken', response.data.jwtToken)
                }),
                
                map((response) => loginSucess({ 
                    user: response, 
                    jwtToken: response.data.jwtToken 
                })),
                catchError((error) => of(loginError({ error: error.error.message })))
                )
            )
        )
    );

    updateProfilePicture$ = createEffect(() =>
        this.action$.pipe(
          ofType(updateProfilePicture),
          mergeMap((action) =>
            this.userservice.uploadProfilePicture(action.file).pipe(
              tap((response) => console.log('Backend image login Response:', response)),
              map((response: { profilePictureUrl: string }) =>
                updateProfilePictureSuccess({ profilePictureUrl: response.profilePictureUrl })
              ),
              catchError((error) =>
                of(updateProfilePictureFailure({ error: error.message || 'Failed to upload profile picture' }))
              )
            )
          )
        )
    );


    fetchUser$ = createEffect(()=>
        this.action$.pipe(
            ofType(fetchUsersDetails),
            switchMap(()=>{
                console.log("effectt works")
                return this.userservice.getLoggedInUser().pipe(
                    map((user)=> fetchUserSucess({user})),
                    catchError(error=> of (fetchUserError({error:error.message})))
                )
            })
        )
    )

    adminLogin$ = createEffect(() =>
        this.action$.pipe(
          ofType(adminLogin),
          mergeMap(action =>
            this.userservice.adminLogin({
              email: action.email,
              password: action.password
            }).pipe(
              tap((responce) =>{ 
                console.log('Backend admin login Response:', responce)
                console.log("jtw token",responce.data.jwtToken)
                localStorage.setItem('jwtToken', responce.data.jwtToken)

              }),
              map(response => adminLoginSucess({
                jwtToken: response
              })),
              catchError(error => of(adminLoginError({ error: error.error })))
            )
          )
        )
    );
      
    getAllUsers$ = createEffect(() =>
      this.action$.pipe(
        ofType(getallUsers),
        switchMap(() => {
          console.log('Effect triggered: getAllUsers');
          return this.userservice.getallUsers().pipe(
            tap(res => console.log("responce get from all user get",res)),
            map((users) => getAllUsersSuccess({ user: users })),
            catchError((error) =>
              of(getallUsersError({ error: error.message }))
            )
          );
        })
      )
    );

    logoutUser$ = createEffect(()=>
      this.action$.pipe(
        ofType(logoutUser),
        tap(()=>{
          localStorage.clear()
        }),
        map(()=> logoutSucess())
      )
  )
}
import { createAction, props } from "@ngrx/store";


export const userRegistration = createAction('[signup component] userRegistration' ,
     props<{name:string,email:string,phoneNumber:string,password:string}>()
)

export const singupSucess = createAction('[singnup component] signupSucess' ,
    props<{user:string}>()
)

export const signupError = createAction ('[singnup component] signupError', 
    props<{error: string}>()
)


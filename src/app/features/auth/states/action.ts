import { createAction, props } from "@ngrx/store";


// signup action

export const userRegistration = createAction('[signup component] userRegistration' ,
     props<{name:string,email:string,phoneNumber:string,password:string}>()
)

export const singupSucess = createAction('[singnup component] signupSucess' ,
    props<{user:string}>()
)

export const signupError = createAction ('[singnup component] signupError', 
    props<{error: string}>()
)

// login action

export const loginuUser = createAction ('[login component] loginUser' ,
    props<{email:string,password:string}>()
)

export const loginSucess = createAction('[login component] loginSucess',
    props<{user: any, jwtToken: string}>()
);

export const loginError = createAction ('[login component] loginError',
    props<{error: string}>()
)


// file upload

export const updateProfilePicture = createAction(
    '[User Profile] Update Profile Picture',
    props<{ file: File }>()
  );
  
  export const updateProfilePictureSuccess = createAction(
    '[User Profile] Update Profile Picture Success',
    props<{ profilePictureUrl: string }>()
  );
  
  export const updateProfilePictureFailure = createAction(
    '[User Profile] Update Profile Picture Failure',
    props<{ error: string }>()
  );


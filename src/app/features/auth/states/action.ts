import { createAction, props } from "@ngrx/store";
import { ResponceInterface } from "../services/userservice.service";



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

  // fetch user details

  export const fetchUsersDetails = createAction('[profile component] fetchUsers')

  export const fetchUserSucess = createAction(
    '[profile component] fetchUserSucess',
    props<{user:any}>()
  );

   export const fetchUserError = createAction(
    '[profile component] fetchUserError',
    props<{error: string}>()
  );
  
  
  // login admin

  export const adminLogin = createAction(
    '[adminlogin componemt] admin login',
    props<{email: string, password: string}>()
  )

  export const adminLoginSucess = createAction(
    '[adminlogin component] admin logginSucess',
    props<{jwtToken:any}>()
  )

  export const adminLoginError = createAction(
    '[adminlogin component] admin loginError',
    props<{error:any}>()
  )

  // get all Users

  export const getallUsers = createAction(
    '[admin signupcomponent] getall Users',
  )

  export const getAllUsersSuccess = createAction(
    '[Admin singnupcomponent] Get All Users Success',
    props<{ user: ResponceInterface[] }>()
  )

  export const getallUsersError = createAction(
    '[admin signupcomponent] getall UsersError',
    props<{ error: any }>()
  )


  export const logoutUser = createAction(
    '[user profile component] logout user'
  )

  export const logoutSucess = createAction(
    '[user profile component] logout sucess'
  )


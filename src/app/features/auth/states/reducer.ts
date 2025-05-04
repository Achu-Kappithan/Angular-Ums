import { createReducer, on } from "@ngrx/store"
import { adminLogin, adminLoginError, adminLoginSucess, fetchUserError, fetchUsersDetails, fetchUserSucess, getallUsers, getallUsersError, getAllUsersSuccess, loginError, loginSucess, loginuUser, logoutUser, signupError, singupSucess, updateProfilePicture, updateProfilePictureFailure, updateProfilePictureSuccess, userRegistration } from "./action"
import { NonNullableFormBuilder } from "@angular/forms"
import { statSync } from "fs"



export interface userState  {
    users :any | null,
    error : string | null,
    loading: boolean,
    logedInUser: any | null,
    jwtToken : string | null,
    profilePicture: string | null,
    logedInAdmin:string| null

}

const initialState:userState = {
    users: null,
    error: null,
    loading: false,
    logedInUser :null,
    jwtToken : null,
    profilePicture : null,
    logedInAdmin : null
}

export const userReducer = createReducer(
    initialState,
    on(userRegistration,(state)=>{
        return {
            ...state,
            loading: true,
            users: null,
            error: null
        }
    }),
    on(singupSucess,(state,{user})=>{
        console.log("data in reducer",user)
        return {
            ...state,
            loading:false,
            users : user
        }
    }),
    on(signupError,(state,{error})=>{
        console.log("error from the reducer",error)
        return{
            ...state,
            loading : false,
            error
        }
    }),

    on(loginuUser,(state)=>{
        return {
            ...state,
            loading: true,
            error : null
        }
    }),
    on(loginSucess, (state, { user, jwtToken }) => {
        console.log("login data from the reducrer",user,jwtToken)
        return {
            ...state,
            loading: false,
            logedInUser: user,
            jwtToken: jwtToken,
            error: null
        };
    }),
    on(loginError,(state,{error})=>{
        console.log("error from the reducer",error)
        return {
            ...state,
            loading: false,
            error:error
        }
    }),
    on(updateProfilePicture, (state) => {
        return {
        ...state,
        loading: true,
        error: null,
        }
    }),
    on(updateProfilePictureSuccess,(state,{profilePictureUrl})=>{
        return{
        ...state,
        loading : false,
        profilePicture: profilePictureUrl
        }
    }),
    on(updateProfilePictureFailure,(state,{error})=>{
        return {
            ...state,
            loading: false,
            error: error
        }
    }),
    on(fetchUsersDetails,(state)=>{
        return{
            ...state,
            loading: true,
            error: null
        }
    }),
    on(fetchUserSucess,(state,{user})=>{
        return{
             ...state,
             logedInUser :user,
             error: null,
             profilePicture:user.user.profile

        }
    }),
    on(fetchUserError,(state,{error})=>{
        return {
            ...state,
            error: error,
            users: null
        }
    }),
    on(adminLoginSucess,(state,{jwtToken})=>{
        console.log("admin data in reducrer",jwtToken.data.jwtToken)
        return{
            ...state,
            logedInUser:jwtToken,
            jwtToken: jwtToken

        }
    }),
    on(adminLoginError,(state,{error})=>{
        console.log("admin login error from the reducer",error)
        return {
            ...state,
            error:error.message,
            logedInUser: null,
            jwtToken: null
        }
    }),
    on(getallUsers,(state)=>{
        return{
            ...state,
            error: null,
            loading : true
        }
    }),
    on(getAllUsersSuccess,(state,{user})=>{
        console.log("responce in the reducer all users",user)
        return {
            ...state,
            users:user,
            error: null,
            loading:false
        }
    }),
    on(getallUsersError,(state,{error})=>{
        return {
            ...state,
            users: null,
            error: error
        }
    }),
    on(logoutUser, () => initialState)
    

)
import { createReducer, on } from "@ngrx/store"
import { loginError, loginSucess, loginuUser, signupError, singupSucess, updateProfilePicture, updateProfilePictureFailure, updateProfilePictureSuccess, userRegistration } from "./action"



export interface userState  {
    users :any | null,
    error : string | null,
    loading: boolean,
    logedInUser: any | null,
    jwtToken : string | null,
    profilePicture: string | null

}

const initialState:userState = {
    users: null,
    error: null,
    loading: false,
    logedInUser :null,
    jwtToken : null,
    profilePicture : null
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
        console.log("responce in reducer url",profilePictureUrl)
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
    })
    

)
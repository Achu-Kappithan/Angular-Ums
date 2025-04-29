import { createReducer, on } from "@ngrx/store"
import { loginError, loginSucess, loginuUser, signupError, singupSucess, userRegistration } from "./action"
import { stat } from "fs"



export interface userState  {
    users :any | null,
    error : string | null,
    loading: boolean,
    logedInUser: any | null,
    jwtToken : string | null

}

const initialState:userState = {
    users: null,
    error: null,
    loading: false,
    logedInUser :null,
    jwtToken : null
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
    })
    

)
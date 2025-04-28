import { createReducer, on } from "@ngrx/store"
import { signupError, singupSucess, userRegistration } from "./action"



export interface userState  {
    users :any | null,
    error : string | null,
    loading: boolean 
}

const initialState:userState = {
    users: null,
    error: null,
    loading: false
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
    })

)
import { createFeatureSelector, createSelector} from '@ngrx/store'
import { userState } from './reducer'

export const selectUserState = createFeatureSelector<userState>('userState')

export  const selectUser = createSelector(
    selectUserState,
    (state)=>state.users
)

export const selectLoading = createSelector(
    selectUserState,
    (state)=>state.loading
)

export const selectError = createSelector(
    selectUserState,
    (state)=>state.error
)

export const selectLoggedInUser = createSelector(
    selectUserState,
    (state) => state.logedInUser
);
export const selectToken = createSelector(
    selectUserState,
    (state) => state.jwtToken
);

export const selectImageurl = createSelector(
    selectUserState,
    (state)=>state.profilePicture
)



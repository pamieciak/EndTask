import { createReducer, on } from "@ngrx/store";
import { authActions } from "./auth.actions";
import { AuthState } from "./auth.state";

const initalState: AuthState = {
  isAuth: false
}

export const authReducer = createReducer(initalState, on(
  authActions.setAuth, (state)=> {
    return{
      ...state,
      isAuth: true
    }
  }
),
on(
authActions.setNoAuth, (state)=> {
  return{
    ...state,
    isAuth:false
  }
}
))

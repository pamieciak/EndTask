import { createAction } from "@ngrx/store";

export const authActions = {
  setAuth: createAction('[Auth] auth is true'),
  setNoAuth: createAction('[Auth] auth is false')
}

import React from 'react'
import { UserInfo } from '../types/UserInfo'
import { Jobs } from '../types/Jobs'
type AppState = {
  mode: string
  userInfo:UserInfo
  searchTerm: string// Add this field
}

const initialState: AppState = {

  userInfo:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')!):null,

  mode: localStorage.getItem('mode')
    ? localStorage.getItem('mode')!
    : window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'dark'
      : 'light',
      searchTerm: '', // Add the initial search term
}
type Action = { type: 'SWITCH_MODE'} |
              { type: 'USER_SIGNIN'; payload:UserInfo }|
              { type:'USER_SIGNOUT'} |
              { type: 'UPDATE_SEARCH_TERM'; payload: string };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SWITCH_MODE':
      localStorage.setItem('mode', state.mode == 'dark' ? 'light' : 'dark')
      return { ...state, mode: state.mode == 'dark' ? 'light' : 'dark' }
  
  case 'USER_SIGNIN':
    return {...state,userInfo:action.payload}
  case 'USER_SIGNOUT': 
  return {...state}
  case 'UPDATE_SEARCH_TERM':
    return { ...state, searchTerm: action.payload };
  }
  
}

const defaultDispatch: React.Dispatch<Action> = () => initialState

const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
})


function StoreProvider(props: React.PropsWithChildren<{}>) {
  const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  )
  return <Store.Provider value={{ state, dispatch }} {...props} />
}

export { Store, StoreProvider }      
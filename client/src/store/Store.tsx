import React from 'react'
import { UserInfo, AdminInfo, HirerInfo } from '../types/UserInfo'
import { Jobs } from '../types/Jobs'
type AppState = {

  userInfo: UserInfo
  adminInfo: AdminInfo
  hirerInfo : HirerInfo
  searchTerm: string// Add this field
}

const initialState: AppState = {

  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null,
  adminInfo: localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')!) : null,
  hirerInfo: localStorage.getItem('hirerInfo') ? JSON.parse(localStorage.getItem('hirerInfo')!) : null,
  searchTerm:''
}
type Action =
  { type: 'USER_SIGNIN'; payload: UserInfo } |
  { type: 'ADMIN_SIGNIN'; payload: AdminInfo} |
  { type: 'HIRER_SIGNIN'; payload: HirerInfo } |
  { type: 'USER_SIGNOUT' } | { type: 'ADMIN_SIGNOUT' } | { type: 'HIRER_SIGNOUT' } |
  { type: 'UPDATE_SEARCH_TERM'; payload: string };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {


    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload }
    case 'USER_SIGNOUT':
      return { ...state }
    case 'ADMIN_SIGNIN':
      return { ...state, adminInfo: action.payload }
    case 'HIRER_SIGNIN':
      return { ...state, hirerInfo: action.payload }
    case 'UPDATE_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'ADMIN_SIGNOUT':
      return { ...state }
    case 'HIRER_SIGNOUT':
      return { ...state }
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
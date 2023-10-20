import React from 'react'
import { UserInfo, AdminInfo, HirerInfo } from '../types/UserInfo'
import { Job, Jobs } from '../types/Jobs'
type AppState = {
  jobs: Jobs[] | null 
  userInfo: UserInfo
  adminInfo: AdminInfo
  hirerInfo : HirerInfo
  searchTerm: string// Add this field
  selectedJob:Job | null
}

const initialState: AppState = {

  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null,
  adminInfo: localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')!) : null,
  hirerInfo: localStorage.getItem('hirerInfo') ? JSON.parse(localStorage.getItem('hirerInfo')!) : null,
  searchTerm:'',
  jobs:[],
  selectedJob: null
}
type Action =
  { type: 'USER_SIGNIN'; payload: UserInfo } |
  { type: 'STORE_JOBS'; payload: Jobs[] } |
  { type: 'SELECT_JOBS'; payload: Job } |
  { type: 'ADMIN_SIGNIN'; payload: AdminInfo} |
  { type: 'HIRER_SIGNIN'; payload: HirerInfo } |
  { type: 'USER_SIGNOUT' } | { type: 'ADMIN_SIGNOUT' } | { type: 'HIRER_SIGNOUT' } |
  { type: 'SEARCH_JOBS'; payload: string };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {


    case 'USER_SIGNIN':
      return { ...state, userInfo: action.payload }
    case 'USER_SIGNOUT':
      return { ...state }
    case 'STORE_JOBS' :
      return {...state,jobs:action.payload}
    case 'SELECT_JOBS' :
      return {...state,selectedJob:action.payload}
    case 'ADMIN_SIGNIN':
      return { ...state, adminInfo: action.payload }
    case 'HIRER_SIGNIN':
      return { ...state, hirerInfo: action.payload }
    case 'SEARCH_JOBS':
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
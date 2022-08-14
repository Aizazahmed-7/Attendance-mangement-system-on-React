import { createSlice } from "@reduxjs/toolkit";
 
export const userSlice = createSlice({
  name: 'userLogin',
  initialState: {
    
  },
  reducers: {
    request: (state, action) => {
      return { loading: true, userInfo: {} }
    },
    success: (state, action) => {
      return { loading: false, error:null ,userInfo: action.payload }
    },
    fail: (state, action) => {
      return { loading: false, error: action.payload }
    },
    logout: (state,action) => {

        return({})
    }
  }
})


export const listUserSlice = createSlice({
  name: 'usersList',
  initialState: {
    
  },
  reducers: {
    requestUserList: (state, action) => {
      return { loading: true, userList: {} }
    },
    successUserList: (state, action) => {
      return { loading: false, userList: action.payload }
    },
    failUserList: (state, action) => {
      return { loading: false, error: action.payload ,userList:null}
    },
    logoutUserList: (state,action) => {

        return({})
    }
  }
})



export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    
  },
  reducers: {
    requestGetUser: (state, action) => {
      return { loading: true, user: {} }
    },
    successGetUser: (state, action) => {
      return { loading: false, user: action.payload }
    },
    failGetUser: (state, action) => {
      return { loading: false, error: action.payload ,user:null}
    },
   
  }
})


export const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState: {
    
  },
  reducers: {
    register: (state, action) => {
      return { loading: false, userInfo: action.payload }
    },
    failRegister: (state, action) => {
      return { loading: false, error: action.payload ,userInfo:null}
    }
    
  }
})




export const {request, success, fail,logout} = userSlice.actions
export const { failRegister,register} = userRegisterSlice.actions
export const {requestUserList,successUserList,failUserList,logoutUserList} = listUserSlice.actions
export const {requestGetUser,successGetUser,failGetUser} = UserSlice.actions
 
export default userSlice
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk' // I still add this for my reference so I know thunk middleware is added
import  userSlice, {userRegisterSlice,listUserSlice, UserSlice} from './reducers/userReducer'
 


const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')): null
const listUserFromStorage = localStorage.getItem('userList') ? JSON.parse(localStorage.getItem('userList')): null
const UserFromStorage = localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User')): null



const store = configureStore({
    reducer: {

        userLogin : userSlice.reducer,
        listUser : listUserSlice.reducer,
        userr : UserSlice.reducer
       // userRegister: userRegisterSlice.reducer,
         
    },
    preloadedState: {
         userLogin:{userInfo:userInfoFromStorage},
         listUser:{userList:listUserFromStorage},   
         userr : {user:UserFromStorage}
    },
    middleware: [thunk],
    devTools:true
})
 
export default store
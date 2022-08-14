import axios from "axios"
import { success,request,fail,logout,register,failRegister,successUserList,failUserList ,successGetUser} from "../reducers/userReducer"



export const Login = (email,password) => async (dispatch) => {
    
    try {

        dispatch(request())
        const config ={
             headers:{
                'Content-Type':'application/json'
             }
        }
        const { data } = await axios.post('/api/users/login',{email,password},config)
        dispatch(success(data))
        localStorage.setItem('userInfo',JSON.stringify(data))
      
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(fail(error))
    }

  }


  export const AdminLogin = (email,password) => async (dispatch) => {
    
    try {

        dispatch(request())
        const config ={
             headers:{
                'Content-Type':'application/json'
             }
        }
        const { data } = await axios.post('/api/admin',{email,password},config)
        

        dispatch(success(data))

        localStorage.setItem('userInfo',JSON.stringify(data))
      
     
      
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(fail(error))
    }

  }



  export const listUser = () => async (dispatch) => {
    
    try {

        const { data } = await axios.get('http://localhost:5000/api/users')
        dispatch(successUserList(data))
        localStorage.setItem('userList',JSON.stringify(data))
      
     
      
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(failUserList(error))
    }

  }


  export const getUserProfile = (id) => async (dispatch) => {
    
    try {

        const { data } = await axios.get(`http://localhost:5000/api/users/${id}`)
        dispatch(successGetUser(data))
       
        localStorage.setItem('User',JSON.stringify(data))
      
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(failUserList(error))
    }

  }




  export const Logout = () => async (dispatch) => {
    
    localStorage.removeItem('userInfo')
    dispatch(logout());

  }



  export const Register = (name,email,password) => async (dispatch) => {
    
    try {

        
        const config ={
             headers:{
                'Content-Type':'application/json'
             }
        }
        const { data } = await axios.post('/api/users',{name,email,password},config)
        
        dispatch(register(data))
        dispatch(success(data))

        localStorage.setItem('userInfo',JSON.stringify(data))
      
     
      
    } catch (err) {
        const error = err.response && err.response.data.message ? err.response.data.message : err.message
        dispatch(failRegister(error))
    }

  }
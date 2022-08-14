import React,{useState,useEffect} from 'react'
import { Link,useNavigate,useLocation} from 'react-router-dom'
import {Container,Form,Button,Row,Col} from 'react-bootstrap'
import {AdminLogin,listUser} from '../action/userActions'
import { Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import FormContainer from '../components/FormContainer'


const AdminLoginScreen = () => {

const [email,setEmail] = useState('')
const [password,setPassword] = useState('')

const dispatch = useDispatch()

const userLogin = useSelector(state=>(state.userLogin))
const {loading,error,userInfo} =userLogin

const navigate = useNavigate();
const location = useLocation();




useEffect(()=>{
    if(userInfo && Object.keys(userInfo).length !==0 ){
        navigate('/adminpanel')
    }
},[userInfo])

const submitHandler = (e) => {
    e.preventDefault()
    dispatch(AdminLogin(email,password))
    dispatch(listUser())
}


  return (
    <FormContainer>
        <h1>Sign in As Admin</h1>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email Adress</Form.Label>
                <Form.Control type='email' placeholder='enter email' value={email} onChange={(e)=>{setEmail(e.target.value)}}>

                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password </Form.Label>
                <Form.Control type='password' placeholder='enter password' value={password} onChange={(e)=>{setPassword(e.target.value)}}>
                    
                </Form.Control>

            </Form.Group>
            <Form.Group><Button className='my-3' type='submit' variant='primary' >Sign In</Button></Form.Group>
        </Form>
    </FormContainer>
  )
}

export default AdminLoginScreen